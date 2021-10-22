const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.createOption = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onCreate(async (snapshot, context) => {
    const metadata = snapshot.data().items[0].price.product.metadata;
    const option = metadata.name === "option";
    const type = metadata.type;

    checkOption(option);

    await updateFirestore(context, type);
    await updateAlgolia(context, type);

    return;
  });

const updateAlgolia = async (context, type) => {
  const index = algolia.initIndex("companys");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: context.auth.uid,
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
};

const updateFirestore = async (context, type) => {
  await db
    .collection("companys")
    .doc(context.params.uid)
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
};

const checkOption = (option) => {
  if (!option) {
    throw new functions.https.HttpsError(
      "cancelled",
      "オプションの更新では無いので処理中止",
      "firebase"
    );
  }
};
