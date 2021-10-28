const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const user = require("./edit/edit");

exports.createProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await createFirestore(context, data);
    await createAlgolia(context, data);

    return { displayName: data.person };
  });

const createFirestore = async (context, data) => {
  await db
    .collection("companys")
    .doc(context.auth.uid)
    .get()
    .then(async (doc) => {
      !doc.exists &&
        (await doc.ref
          .set(
            user.companys({
              context: context,
              data: data,
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
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject(
      user.companys({
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
