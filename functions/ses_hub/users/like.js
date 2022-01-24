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
    await userAuthenticated({ data: data, context: context, demo: true });

    await updateFirestore({ context: context, data: data });

    return;
  });

const updateFirestore = async ({ context, data, add }) => {
  const timestamp = Date.now();

  const doc = await db
    .collection("companys")
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
      ? doc.data().likes?.[data.index]
      : doc
          .data()
          .likes[data.index].filter(
            (id) => id !== (data.objectID ? data.objectID : data.uid)
          );

    await doc.ref
      .set(
        {
          likes: add
            ? likes
              ? likes.indexOf(data.objectID ? data.objectID : data.uid) < 0 && {
                  [data.index]: [
                    data.objectID ? data.objectID : data.uid,
                    ...likes,
                  ],
                }
              : {
                  [data.index]: [data.objectID ? data.objectID : data.uid],
                }
            : {
                [data.index]: [...likes],
              },
          updateAt: timestamp,
        },
        { merge: true }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "いいねの追加に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
