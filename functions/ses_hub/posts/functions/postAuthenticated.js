const functions = require("firebase-functions");
const db = require("../../../firebase").db;

exports.postAuthenticated = async ({ context, canceled }) => {
  const doc = await db.collection("companys").doc(context.auth.uid).get();

  if (context.auth.uid === functions.config().demo.ses_hub.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "デモユーザーのため、処理中止",
      "firebase"
    );
  }

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

  if (doc.data().payment.status === "canceled" && canceled) {
    throw new functions.https.HttpsError(
      "cancelled",
      "リミテッドユーザーのため、処理中止",
      "firebase"
    );
  }
};
