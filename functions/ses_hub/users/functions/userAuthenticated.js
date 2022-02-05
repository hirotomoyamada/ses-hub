const functions = require("firebase-functions");
const db = require("../../../firebase").db;

exports.userAuthenticated = async ({
  context,
  uid,
  demo,
  agree,
  canceled,
  fetch,
  index,
  parent,
}) => {
  const doc = await db
    .collection("companys")
    .doc(!parent ? context.auth.uid : uid)
    .get();

  if (
    (!parent ? context.auth.uid : uid) ===
      functions.config().demo.ses_hub.uid &&
    demo
  ) {
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

  if (doc.data().agree !== "enable" && !agree) {
    throw new functions.https.HttpsError(
      "cancelled",
      "利用規約に同意が無いユーザーのため、処理中止",
      "firebase"
    );
  }

  if (doc.data().payment.status === "canceled" && canceled) {
    if (!fetch) {
      throw new functions.https.HttpsError(
        "cancelled",
        "リミテッドユーザーのため、処理中止",
        "firebase"
      );
    } else {
      return false;
    }
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

  return true;
};
