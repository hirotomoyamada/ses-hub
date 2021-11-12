const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const user = require("./edit/edit");

exports.createChild = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      uid: data,
      demo: true,
      canceled: true,
      parent: true,
    });

    const parent = await fetchParent(context, data);

    const user = await createFirestore(context, parent);

    await createAlgolia(context, parent);

    return user;
  });

const fetchParent = async (context, uid) => {
  const parent = await db
    .collection("companys")
    .doc(uid)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        const children = [...doc.data().payment.children, context.auth.uid];
        const account = doc.data().payment.account;

        if (!account || doc.data().type !== "parent") {
          throw new functions.https.HttpsError(
            "cancelled",
            "有効なアカウントまたはプランでは無いため、処理中止",
            "firebase"
          );
        }

        if (children.length >= account) {
          throw new functions.https.HttpsError(
            "cancelled",
            "作成できる上限を超えているため処理中止",
            "firebase"
          );
        }

        await doc.ref
          .set({ payment: { children: children } }, { merge: true })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "プロフィールの更新に失敗しました",
              "firebase"
            );
          });
      }

      return { ...doc.data(), uid: uid };
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return parent;
};

const createFirestore = async (context, parent) => {
  const child = user.companys({
    context: context,
    data: parent,
    create: true,
    child: true,
    doc: true,
  });

  await db
    .collection("companys")
    .doc(context.auth.uid)
    .get()
    .then(async (doc) => {
      !doc.exists &&
        (await doc.ref.set(child).catch((e) => {
          throw new functions.https.HttpsError(
            "data-loss",
            "プロフィールの更新に失敗しました",
            "firebase"
          );
        }));
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return {
    uid: context.auth.uid,
    icon: child.icon,
    cover: child.icon,
    type: child.type,
    profile: child.profile,
    createAt: child.createAt,
  };
};

const createAlgolia = async (context, parent) => {
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject(
      user.companys({
        context: context,
        data: parent,
        create: true,
        child: true,
      }),
      {
        createIfNotExists: true,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの作成に失敗しました",
        "algolia"
      );
    });
};
