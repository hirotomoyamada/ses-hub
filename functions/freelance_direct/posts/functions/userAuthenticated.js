const functions = require("firebase-functions");
const db = require("../../../firebase").db;

exports.userAuthenticated = async (context) => {
  const doc = await db.collection("persons").doc(context.auth.uid).get();

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

  return true;
};
