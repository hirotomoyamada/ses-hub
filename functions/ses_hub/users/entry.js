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
      canceled: true,
    });

    const timestamp = Date.now();

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          const entries = doc.data().entries?.[data.index];

          await doc.ref
            .set(
              {
                entries: entries
                  ? entries.indexOf(data.objectID) < 0 && {
                      [data.index]: [data.objectID, ...entries],
                    }
                  : { [data.index]: [data.objectID] },
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
