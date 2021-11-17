const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const timestamp = Date.now();

/**********************************
 * 職務経歴書 を保存
 **********************************/

exports.uploadResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // ファイルサイズが有効かどうか判定
    if (data.length > 0.4 * 1024 * 1024) {
      throw new functions.https.HttpsError(
        "cancelled",
        "容量が大きすぎます",
        "storage"
      );
    }

    // ドキュメントを取得
    const url = await db
      .collection("persons")
      .doc(data.uid)
      .get()
      .then(async (doc) => {
        // ドキュメントがあるかどうか判定
        return doc.exists && (await uploadFile(data.file, doc, data.uid));
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    return url;
  });

/**********************************
 * ファイル 保存
 **********************************/

const uploadFile = async (file, doc, uid) => {
  // Firestorage へアクセスするURL
  const key = doc.data().resume.key
    ? doc.data().resume.key
    : // URLがなければ作成
      `${uid}-${Math.random().toString(32).substring(2)}`;

  // ファイル名 定義
  const name = `${key}.pdf`;

  // Firestorage バケットを指定
  const bucket = storage.bucket(functions.config().storage.resume);

  // ファイルを base64 に変換
  const buffer = Buffer.from(file, "base64");

  // Firestorage ファイルの保存先を指定
  const path = bucket.file(name);

  // ファイルの保存先を取得・保存
  const url = await path
    .save(buffer, {
      metadata: {
        contentType: "application/pdf",
      },
    })
    .then(async () => {
      // 保存したファイルのURLを取得
      const url = await path.makePublic().then(() => {
        return path.publicUrl();
      });

      // Firestore 上書き保存
      await updateFirestore(doc, key, url);

      return url;
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ファイルの作成に失敗しました",
        "storage"
      );
    });

  return url;
};

/**********************************
 * Firestore 上書き保存
 **********************************/

const updateFirestore = async (doc, key, url) => {
  // ドキュメントに上書き保存
  await doc.ref
    .set(
      {
        resume: { key: key, url: url },
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
