const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const db = require("../../firebase").db;

const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const dataTime = Date.now();

exports.deleteResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid !== functions.config().admin.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "無効なユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
      .collection("persons")
      .doc(data.uid)
      .get()
      .then(async (doc) => {
        doc.exists && deleteFile(doc);
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
  const bucket = storage.bucket("ses-hub-resume");
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
