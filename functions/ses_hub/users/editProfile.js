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

    const child = await fetchChild(context, data);

    if (context.auth.uid === data.uid || child) {
      await editFirestore(context, data);
      await editAlgolia(context, data);

      return;
    }
  });

const fetchChild = async (context, data) => {
  const doc = await db.collection("companys").doc(context.auth.uid).get();

  return (
    doc.exists &&
    doc.data().type === "parent" &&
    doc.data().payment?.children?.find((uid) => uid === data.uid)
  );
};

const editFirestore = async (context, data) => {
  const doc = await db
    .collection("companys")
    .doc(context.auth.uid === data.uid ? context.auth.uid : data.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  doc.exists &&
    (await doc.ref
      .set(
        user.companys({
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
      }));
};

const editAlgolia = async (context, data) => {
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject(
      user.companys({
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
