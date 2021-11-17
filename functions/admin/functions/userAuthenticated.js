const functions = require("firebase-functions");

/**********************************
 * 有効なアカウントかどうかを判定
 **********************************/

exports.userAuthenticated = async ({ context }) => {
  // 有効なアカウントかどうかを判定
  if (context.auth.uid !== functions.config().admin.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "無効なユーザーのため、処理中止",
      "firebase"
    );
  }
};
