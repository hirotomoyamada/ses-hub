const functions = require("firebase-functions");
const db = require("../../../firebase").db;

exports.userAuthenticated = async ({
  context,
  demo,
  agree,
}) => {
  if (context.auth.uid === functions.config().demo.ses_hub.uid && demo) {
    throw new functions.https.HttpsError(
      "cancelled",
      "デモユーザーのため、処理中止",
      "firebase"
    );
  }

  await db
    .collection("persons")
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

      if (doc.data().agree !== "enable" && !agree) {
        throw new functions.https.HttpsError(
          "cancelled",
          "利用規約に同意が無いユーザーのため、処理中止",
          "firebase"
        );
      }
    });
};
