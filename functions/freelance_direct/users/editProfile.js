const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const user = require("./edit/edit");

exports.editProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    if (context.auth.uid === data.uid) {
      await editFirestore(context, data);
      await editAlgolia(context, data);

      return;
    }
  });

const editFirestore = async (context, data) => {
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

  if (doc.exists) {
    await doc.ref
      .set(
        user.persons({
          context: context,
          data: data,
          doc: true,
        }),
        { merge: true }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プロフィールの更新に失敗しました",
          "firebase"
        );
      });
  }
};

const editAlgolia = async (context, data) => {
  const index = algolia.initIndex("persons");

  await index
    .partialUpdateObject(
      user.persons({
        context: context,
        data: data,
      }),
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
