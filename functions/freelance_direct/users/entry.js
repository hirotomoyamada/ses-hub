const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.addEntry = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
    });

    const timestamp = Date.now();

    await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const entries = doc.data().entries;
          doc.ref
            .set(
              entries
                ? entries.indexOf(data) < 0 && {
                    entries: [data, ...entries],
                    updateAt: timestamp,
                  }
                : {
                    entries: [data],
                    updateAt: timestamp,
                  },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "エントリーの追加に失敗しました",
                "firebase"
              );
            });
        }
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    return;
  });
