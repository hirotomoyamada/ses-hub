const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.createOption = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onCreate(async (snapshot, context) => {
    await userAuthenticated(context.params.uid);

    const metadata = snapshot.data().items[0].price.product.metadata;
    const option = metadata.name === "option";
    const type = metadata.type;

    checkOption(option);

    const children = await fetchChildren(context);

    await updateFirestore(context, type, children);
    await updateAlgolia(context, type, children);

    return;
  });

const fetchChildren = async (context) => {
  const children = await db
    .collection("companys")
    .doc(context.params.uid)
    .get()
    .then(async (doc) => {
      if (doc.exists && doc.data().payment?.children) {
        return doc.data().payment.children;
      }
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return children;
};

const updateAlgolia = async (context, type, children) => {
  await partialUpdateObject(context.params.uid, type);

  if (children?.length) {
    for await (const uid of children) {
      await partialUpdateObject(uid, type);
    }
  }
};

const partialUpdateObject = async (uid, type) => {
  const index = algolia.initIndex("companys");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: uid,
        [type]: "enable",
        updateAt: timestamp,
      },
      {
        createIfNotExists: true,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "algolia"
      );
    });

  return;
};

const updateFirestore = async (context, type, children) => {
  await set(context.params.uid, type);

  if (children?.length) {
    for await (const uid of children) {
      await set(uid, type);
    }
  }

  return;
};

const set = async (uid, type) => {
  await db
    .collection("companys")
    .doc(uid)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        const option = doc.data().payment?.option
          ? doc.data().payment?.option
          : {};
        option[type] = true;

        await doc.ref
          .set(
            {
              payment: {
                option: option,
                load: false,
              },
            },
            { merge: true }
          )
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "プロフィールの更新に失敗しました",
              "firebase"
            );
          });
      }
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return;
};

const checkOption = (option) => {
  if (!option) {
    throw new functions.https.HttpsError(
      "cancelled",
      "オプションの更新では無いので処理中止",
      "firebase"
    );
  }

  return;
};
