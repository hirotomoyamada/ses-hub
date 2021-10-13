const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.createOption = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onCreate(async (snapshot, context) => {
    const option =
      snapshot.data().items[0].price.product.metadata.name === "option"
        ? true
        : false;
    const type = snapshot.data().items[0].price.product.metadata.type;

    if (!option) {
      throw new functions.https.HttpsError(
        "cancelled",
        "オプションの更新では無いので処理中止",
        "firebase"
      );
    }

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
  });
