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

    const seshub = await fetchData("seshub");
    const freelanceDirect = await fetchData("freelanceDirect");

    return {
      uid: context.auth.uid,
      seshub: seshub,
      freelanceDirect: freelanceDirect,
    };
  });

const fetchData = async (collection) => {
  const data = {};

  const docs = await db
    .collection(collection)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "データの取得に失敗しました",
        "firebase"
      );
    });

  docs.forEach((doc) => {
    data[doc.id] = doc.data();
  });

  return data;
};
