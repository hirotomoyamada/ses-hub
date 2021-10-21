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

    const timestamp = Date.now();

    await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const likes = doc.data().likes;
          doc.ref
            .set(
              likes
                ? likes.indexOf(data.objectID) < 0 && {
                    likes: [data, ...likes],
                    updateAt: timestamp,
                  }
                : {
                    likes: [data],
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

exports.removeLike = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    const timestamp = Date.now();

    await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const likes = doc
            .data()
            .likes.filter((objectID) => objectID !== data);

          doc.ref
            .set(
              {
                likes: [...likes],
                updateAt: timestamp,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "いいねの削除に失敗しました",
                "firebase"
              );
            });
        }
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
