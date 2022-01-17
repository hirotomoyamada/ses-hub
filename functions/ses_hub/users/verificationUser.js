const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.verificationUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    data.type && (await verificationType(data));

    return;
  });

const verificationType = async (data) => {
  await db
    .collection("companys")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          doc.data().profile?.email === data.email &&
          doc.data().type === data.type
        ) {
          throw new functions.https.HttpsError(
            "cancelled",
            "無効なユーザーのため、処理中止",
            "firebase"
          );
        }
      });
    });

  return;
};
