const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.updateHome = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
      canceled: true,
    });

    const dataTime = Date.now();
    
    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.ref
            .set(
              {
                home: data,
                updateAt: dataTime,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "ホームの追加に失敗しました",
                "firebase"
              );
            });
        }
      });

    return;
  });
