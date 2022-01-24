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

    const doc = await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    if (doc.exists) {
      const entries = doc.data().entries;

      await doc.ref
        .set(
          {
            entries: entries
              ? entries.indexOf(data) < 0 && [data, ...entries]
              : [data],
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

    return;
  });
