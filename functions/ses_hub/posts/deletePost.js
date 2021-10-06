const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const postAuthenticated =
  require("./functions/postAuthenticated").postAuthenticated;

exports.deletePost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await postAuthenticated(context);

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
