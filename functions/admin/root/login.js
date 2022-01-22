const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.login = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid !== functions.config().admin.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "無効なユーザーのため、処理中止",
        "firebase"
      );
    }

    const seshub = {};
    const freelanceDirect = {};

    await db
      .collection("seshub")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          seshub[doc.id] = doc.data();
        });
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "データの取得に失敗しました",
          "firebase"
        );
      });

    await db
      .collection("freelanceDirect")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          freelanceDirect[doc.id] = doc.data();
        });
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "データの取得に失敗しました",
          "firebase"
        );
      });

    return {
      uid: context.auth.uid,
      seshub: seshub,
      freelanceDirect: freelanceDirect,
    };
  });
