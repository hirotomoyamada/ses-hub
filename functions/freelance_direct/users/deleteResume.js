const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const db = require("../../firebase").db;

const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

const timestamp = Date.now();

exports.deleteResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

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

    doc.exists && (await deleteFile(doc));

    return;
  });

const deleteFile = async (doc) => {
  const key = doc.data().resume.key;

  if (!key) {
    throw new functions.https.HttpsError(
      "cancelled",
      "データが無いため、処理中止",
      "firebase"
    );
  }

  const name = `${key}.pdf`;
  const bucket = storage.bucket(functions.config().storage.resume);
  const path = bucket.file(name);

  await path
    .delete()
    .then(async () => {
      await updateFirestore(doc);
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ファイルの削除に失敗しました",
        "storage"
      );
    });
};

const updateFirestore = async (doc) => {
  await doc.ref
    .set(
      {
        resume: { key: "", url: "" },
        updateAt: timestamp,
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
