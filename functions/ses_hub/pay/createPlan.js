const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.createPlan = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onCreate(async (snapshot, context) => {
    const status = snapshot.data().status;
    const price = snapshot.data().items[0].plan.id;
    const start = snapshot.data().current_period_start.seconds * 1000;
    const end = snapshot.data().current_period_end.seconds * 1000;
    const plan =
      snapshot.data().items[0].price.product.metadata.name === "plan"
        ? true
        : false;

    if (!plan) {
      throw new functions.https.HttpsError(
        "cancelled",
        "プランの更新では無いので処理中止",
        "firebase"
      );
    }

    await db
      .collection("companys")
      .doc(context.params.uid)
      .get()
      .then(async (doc) => {
        doc.exists &&
          (await doc.ref
            .set(
              {
                payment: {
                  status: status,
                  price: price,
                  start: start,
                  end: end,
                  trial: false,
                  cancel: false,
                  notice: false,
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
            }));
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザー全体の取得に失敗しました",
          "firebase"
        );
      });
  });
