const functions = require("firebase-functions");
const db = require("../../../firebase").db;

exports.userAuthenticated = async (uid) => {
  if (uid === functions.config().demo.ses_hub.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "デモユーザーのため、処理中止",
      "firebase"
    );
  }

  await db
    .collection("companys")
    .doc(uid)
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

      if (doc.data().type === "child") {
        throw new functions.https.HttpsError(
          "cancelled",
          "子アカウントのため、処理中止",
          "firebase"
        );
      }
    });
};
