const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.changeEmail = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    const dataTime = Date.now();

    const index = algolia.initIndex("persons");
    
    await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          doc.ref
            .set(
              {
                profile: {
                  email: data.email,
                },
                updateAt: dataTime,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "メールアドレスの更新に失敗しました",
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

    await index
      .partialUpdateObject(
        {
          objectID: context.auth.uid,
          email: data.email,
          updateAt: dataTime,
        },
        {
          createIfNotExists: true,
        }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "メールアドレスの更新に失敗しました",
          "algolia"
        );
      });

    return;
  });
