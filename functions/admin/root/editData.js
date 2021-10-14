const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.editData = functions
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

    for await (const type of Object.keys(data)) {
      if (type !== "index") {
        await db
          .collection(
            data.index === "companys"
              ? "seshub"
              : data.index === "persons" && "freelanceDirect"
          )
          .doc(type)
          .get()
          .then(async (doc) => {
            data[type].updateAt = Date.now();

            if (doc.exists) {
              await doc.ref.set(data[type], { merge: true }).catch((e) => {
                throw new functions.https.HttpsError(
                  "data-loss",
                  "データの更新に失敗しました",
                  "firebase"
                );
              });
            }
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "データの取得に失敗しました",
              "firebase"
            );
          });
      }
    }

    return data;
  });