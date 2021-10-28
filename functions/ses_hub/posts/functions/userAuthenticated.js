const functions = require("firebase-functions");
const db = require("../../../firebase").db;

exports.userAuthenticated = async ({ context, index }) => {
  return await db
    .collection("companys")
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

      if (doc.data().agree !== "enable") {
        throw new functions.https.HttpsError(
          "cancelled",
          "利用規約に同意が無いユーザーのため、処理中止",
          "firebase"
        );
      }

      if (
        index === "persons" &&
        (doc.data().payment.status === "canceled" ||
          !doc.data().payment.option?.freelanceDirect)
      ) {
        throw new functions.https.HttpsError(
          "cancelled",
          "オプション未加入のユーザーのため、処理中止",
          "firebase"
        );
      }

      if (doc.data().payment.status === "canceled") {
        return false;
      }

      return true;
    });
};
