const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const storage = require("../../firebase").storage;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const user = require("./edit/edit");

exports.createProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const file = await uploadFile(data.file, data.type, context.auth.uid);
    await createFirestore(context, data, file);
    await createAlgolia(context, data);

    return { displayName: data.person };
  });

const uploadFile = async (file, type, uid) => {
  if (file.length > 0.4 * 1024 * 1024) {
    throw new functions.https.HttpsError(
      "cancelled",
      "容量が大きすぎるので処理中止",
      "storage"
    );
  }

  if (type !== "application/pdf") {
    throw new functions.https.HttpsError(
      "cancelled",
      "PDFでは無いので処理中止",
      "storage"
    );
  }

  const key = `${uid}-${Math.random().toString(32).substring(2)}`;

  const name = `${key}.pdf`;
  const bucket = storage.bucket(functions.config().storage.resume);
  const buffer = Buffer.from(file, "base64");
  const path = bucket.file(name);

  const url = await path
    .save(buffer, {
      metadata: {
        contentType: "application/pdf",
      },
    })
    .then(async () => {
      await path.makePublic();

      return path.publicUrl();
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ファイルの作成に失敗しました",
        "storage"
      );
    });

  return { key: key, url: url };
};

const createFirestore = async (context, data, file) => {
  await db
    .collection("persons")
    .doc(context.auth.uid)
    .get()
    .then(async (doc) => {
      !doc.exists &&
        (await doc.ref
          .set(
            user.persons({
              context: context,
              data: data,
              file: file,
              create: true,
              doc: true,
            })
          )
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "プロフィールの作成に失敗しました",
              "firebase"
            );
          }));
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });
};

const createAlgolia = async (context, data) => {
  const index = algolia.initIndex("persons");

  await index
    .partialUpdateObject(
      user.persons({
        context: context,
        data: data,
        create: true,
      }),
      {
        createIfNotExists: true,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの作成に失敗しました",
        "algolia"
      );
    });
};
