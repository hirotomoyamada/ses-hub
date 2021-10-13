const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.createPayment = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}")
  .onCreate(async (snapshot, context) => {
    const id = snapshot.data().stripeId;
    const link = snapshot.data().stripeLink;

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
                  id: id,
                  link: link,
                  trial: true,
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
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });
  });
