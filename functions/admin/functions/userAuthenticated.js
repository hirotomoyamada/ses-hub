const functions = require("firebase-functions");

exports.userAuthenticated = async (context) => {
  if (context.auth.uid !== functions.config().admin.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "無効なユーザーのため、処理中止",
      "firebase"
    );
  }
};
