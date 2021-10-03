const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.deletePost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid === functions.config().demo.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "デモユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.data().status !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "無効なユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().agree !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "利用規約に同意が無いユーザーのため、処理中止",
            "firebase"
          );
        }
      });

    if (context.auth.uid === data.post.uid) {
      const index = algolia.initIndex(data.index);
      await index
        .deleteObject(data.post.objectID)
        .then(async () => {
          await db
            .collection("companys")
            .doc(context.auth.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const posts = doc
                  .data()
                  .posts[data.index].filter(
                    (objectID) => objectID !== data.post.objectID
                  );

                doc.ref.set(
                  {
                    posts: { [data.index]: [...posts] },
                  },
                  { merge: true }
                );
              }
            })
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "投稿の削除に失敗しました",
                "firebase"
              );
            });
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "data-loss",
            "投稿の削除に失敗しました",
            "algolia"
          );
        });

      return;
    }
  });
