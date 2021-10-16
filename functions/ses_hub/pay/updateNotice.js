const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.updateNotice = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 * * *")
  .onRun(async () => {
    await db
      .collection("companys")
      .where("payment.status", "==", "canceled")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .set(
              {
                payment: {
                  notice: true,
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
  });
