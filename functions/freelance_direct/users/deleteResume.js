const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;

const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.deleteResume = functions
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
      .then(async (doc) => {
        if (doc.exists) {
          const resume = doc.data().profile.resume;

          if (!resume) {
            throw new functions.https.HttpsError(
              "cancelled",
              "データが無いため、処理中止",
              "firebase"
            );
          }

          const name = `${resume}.pdf`;
          const bucket = storage.bucket("ses-hub-resume");
          const path = bucket.file(name);

          await path.delete().then(async (err) => {
            if (!err) {
              await updateFirestore(doc);
              await updateAlgolia();
            } else {
              throw new functions.https.HttpsError(
                "data-loss",
                "ファイルの削除に失敗しました",
                "storage"
              );
            }
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

    const updateFirestore = async (doc) => {
      await doc.ref
        .set(
          {
            profile: { resume: "" },
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
    };

    const updateAlgolia = async () => {
      await index
        .partialUpdateObject(
          {
            objectID: context.auth.uid,
            resume: "",
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
    };

    return;
  });
