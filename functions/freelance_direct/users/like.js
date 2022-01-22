const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.addLike = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateFirestore({ context: context, data: data, add: true });

    return;
  });

exports.removeLike = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateFirestore({ context: context, data: data });

    return;
  });

const updateFirestore = async ({ context, data, add }) => {
  const timestamp = Date.now();

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
    const likes = add
      ? doc.data().likes
      : doc.data().likes.filter((objectID) => objectID !== data);

    await doc.ref
      .set(
        {
          likes: add
            ? likes
              ? likes.indexOf(data.objectID) < 0 && [data, ...likes]
              : [data]
            : [...likes],
          updateAt: timestamp,
        },
        { merge: true }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          add ? "いいねの追加に失敗しました" : "いいねの削除に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
