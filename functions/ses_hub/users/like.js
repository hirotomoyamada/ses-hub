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
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const likes = doc.data().likes?.[data.index];
          doc.ref
            .set(
              likes
                ? likes.indexOf(data.objectID ? data.objectID : data.uid) <
                    0 && {
                    likes: {
                      [data.index]: [
                        data.objectID ? data.objectID : data.uid,
                        ...likes,
                      ],
                    },
                    updateAt: timestamp,
                  }
                : {
                    likes: {
                      [data.index]: [data.objectID ? data.objectID : data.uid],
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
    await userAuthenticated({ data: data, context: context, demo: true });

    const timestamp = Date.now();

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const likes = doc
            .data()
            .likes[data.index].filter(
              (id) => id !== (data.objectID ? data.objectID : data.uid)
            );

          doc.ref
            .set(
              {
                likes: { [data.index]: [...likes] },
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
