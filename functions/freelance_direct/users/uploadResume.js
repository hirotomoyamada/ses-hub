const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;

const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.uploadResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    const dataTime = Date.now();

    const index = algolia.initIndex("persons");

    const resume = await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          const resume = doc.data().profile.resume
            ? doc.data().profile.resume
            : `${context.auth.uid}-${Math.random().toString(32).substring(2)}`;

          const name = `${resume}.pdf`;
          const bucket = storage.bucket("ses-hub-resume");
          const buffer = Buffer.from(data);
          const path = bucket.file(name);

          await path.save(buffer);

          await doc.ref
            .set(
              {
                profile: { resume: resume },
                updateAt: dataTime,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "プロフィールの更新に失敗しました",
                "firebase"
              );
            });

          return resume;
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
          resume: resume,
          updateAt: dataTime,
        },
        {
          createIfNotExists: true,
        }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プロフィールの更新に失敗しました",
          "algolia"
        );
      });

    return resume;
  });
