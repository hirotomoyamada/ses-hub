const functions = require("firebase-functions");
const db = require("../../../firebase").db;

exports.loginAuthenticated = async ({ data, context, doc }) => {
  if (!doc) {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "認証されていないユーザーではログインできません",
        "auth"
      );
    }

    await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          throw new functions.https.HttpsError(
            "unavailable",
            "このアカウントでは利用できません",
            "disable"
          );
        }
      });

    if (!data.emailVerified) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "メールアドレスが認証されていません",
        "emailVerified"
      );
    }
  } else {
    if (doc.data().status === "hold") {
      throw new functions.https.HttpsError(
        "unavailable",
        "承認されていません",
        "hold"
      );
    }

    if (doc.data().status === "disable") {
      throw new functions.https.HttpsError(
        "unavailable",
        "プロバイダーの更新に失敗しました",
        "disable"
      );
    }
  }
};
