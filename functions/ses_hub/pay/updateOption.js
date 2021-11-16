const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.updateOption = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onUpdate(async (change, context) => {
    await userAuthenticated(context.params.uid);

    const after = change.after.data();
    const status = after.status;
    const price = after.items[0].plan.id;
    const remove = after.ended_at ? true : false;

    const metadata = after.items[0].price.product.metadata;
    const option = metadata.name === "option";
    const type = metadata.type;

    checkOption(option);
    checkCancel(status);

    await checkDuplicate(context, remove, price, type);

    const children = await fetchChildren(context);

    await updateFirestore(context, type, children);
    await updateAlgolia(context, type, children);

    remove && (await deleteOption(context));

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

const deleteOption = async (context) => {
  await db
    .collection("customers")
    .doc(context.params.uid)
    .collection("subscriptions")
    .doc(context.params.sub)
    .delete()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ドキュメントの削除に失敗しました",
        "firebase"
      );
    });

  return;
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
        [type]: "disable",
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
      const option = doc.data().payment?.option
        ? doc.data().payment?.option
        : {};
      option[type] = false;

      await doc.ref
        .set(
          {
            payment: {
              option: option,
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

const checkDuplicate = async (context, remove, price, type) => {
  const duplicate = await db
    .collection("customers")
    .doc(context.params.uid)
    .collection("subscriptions")
    .get()
    .then((subscriptions) => {
      const docs = subscriptions.docs.length;
      const doc = subscriptions.docs.filter(
        (doc) =>
          (doc.data().status === "active" ||
            doc.data().status === "trialing") &&
          doc.data().items[0].price.id !== price &&
          doc.data().items[0].price.product.metadata.name === "option" &&
          doc.data().items[0].price.product.metadata.type === type
      ).length;

      return docs > 1 && doc;
    });

  if (duplicate && remove) {
    await db
      .collection("customers")
      .doc(context.params.uid)
      .collection("subscriptions")
      .doc(context.params.sub)
      .delete()
      .then(() => {
        throw new functions.https.HttpsError(
          "cancelled",
          "ドキュメントを削除しました",
          "firebase"
        );
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "ドキュメントの削除に失敗しました",
          "firebase"
        );
      });
  } else if (duplicate) {
    throw new functions.https.HttpsError(
      "cancelled",
      "同じ属性のオプションが有効のため処理中止",
      "firebase"
    );
  }

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

const checkCancel = (status) => {
  if (status !== "canceled") {
    throw new functions.https.HttpsError(
      "cancelled",
      "更新が無いので処理中止",
      "firebase"
    );
  }

  return;
};
