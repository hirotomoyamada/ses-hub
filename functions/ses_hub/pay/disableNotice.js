const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.disableNotice = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const doc = await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    if (doc.exists) {
      await doc.ref
        .set(
          {
            payment: {
              notice: false,
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

    return;
  });
