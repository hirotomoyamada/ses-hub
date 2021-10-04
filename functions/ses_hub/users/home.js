const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.updateHome = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid === functions.config().demo.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "デモユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.data().status !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "無効なユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().agree !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "利用規約に同意が無いユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().payment.status === "canceled") {
          throw new functions.https.HttpsError(
            "cancelled",
            "リミテッドユーザーのため、処理中止",
            "firebase"
          );
        }
      });

    const dataTime = Date.now();
    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.ref
            .set(
              {
                home: data.uids,
                updateAt: dataTime,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "ホームの追加に失敗しました",
                "firebase"
              );
            });
        }
      });

    return;
  });