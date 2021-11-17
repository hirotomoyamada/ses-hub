const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const timestamp = Date.now();

/**********************************
 * 職務経歴書 を削除
 **********************************/

exports.deleteResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // ドキュメントを取得
    await db
      .collection("persons")
      .doc(data)
      .get()
      .then(async (doc) => {
        // ドキュメントがあるかどうか判定
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

/**********************************
 * ファイル 削除
 **********************************/

const deleteFile = async (doc) => {
  // Firestorage へアクセスするURL
  const key = doc.data().resume.key;

  // URLがなければ処理中止
  if (!key) {
    throw new functions.https.HttpsError(
      "cancelled",
      "データが無いため、処理中止",
      "firebase"
    );
  }

  // ファイル名 定義
  const name = `${key}.pdf`;

  // Firestorage バケットを指定
  const bucket = storage.bucket(functions.config().storage.resume);

  // Firestorage ファイルの保存先を指定
  const path = bucket.file(name);

  // ファイルの保存先を取得・削除
  await path
    .delete()
    .then(async () => {
      // Firestore 上書き保存
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

/**********************************
 * Firestore 上書き保存
 **********************************/

const updateFirestore = async (doc) => {
  // ドキュメントに上書き保存
  await doc.ref
    .set(
      {
        resume: { key: "", url: "" },
        updateAt: timestamp,
      },
      // 上書きを許可するかどうか
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
