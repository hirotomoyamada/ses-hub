const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const db = require("../../firebase").db;

const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

const timestamp = Date.now();

exports.uploadResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    if (data.length > 0.4 * 1024 * 1024) {
      throw new functions.https.HttpsError(
        "cancelled",
        "アップロードするファイルの容量が大きすぎます",
        "storage"
      );
    }

    if (data.type !== "application/pdf") {
      throw new functions.https.HttpsError(
        "cancelled",
        "アップロードするファイルがpdf形式ではありません",
        "storage"
      );
    }

    const url = await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .then(async (doc) => {
        return doc.exists && (await uploadFile(data, doc, context.auth.uid));
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

const uploadFile = async (data, doc, uid) => {
  const key = doc.data().resume.key
    ? doc.data().resume.key
    : `${uid}-${Math.random().toString(32).substring(2)}`;

  const name = `${key}.pdf`;
  const bucket = storage.bucket(functions.config().storage.resume);
  const buffer = Buffer.from(data, "base64");
  const path = bucket.file(name);

  const url = await path
    .save(buffer, {
      metadata: {
        contentType: "application/pdf",
      },
    })
    .then(async () => {
      const url = await path.makePublic().then(() => {
        return path.publicUrl();
      });

      await updateFirestore(doc, key, url);

      return url;
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ファイルのアップロードに失敗しました",
        "storage"
      );
    });

  return url;
};

const updateFirestore = async (doc, key, url) => {
  await doc.ref
    .set(
      {
        resume: { key: key, url: url },
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
