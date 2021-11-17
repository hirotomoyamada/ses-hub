const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

/**********************************
 * 案件・人材 投稿を削除
 **********************************/

exports.deletePost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    const index = algolia.initIndex(data.index);

    await index
      .deleteObject(data.post.objectID)
      .then(async () => {
        await db
          .collection("companys")
          .doc(data.post.uid)
          .get()
          .then((doc) => {
            // ドキュメントがあるかどうか判定
            if (doc.exists) {
              // 指定された投稿を消して、新しい配列を作成
              const posts = doc
                .data()
                .posts[data.index].filter(
                  (objectID) => objectID !== data.post.objectID
                );

              // 作成した配列をドキュメントに上書き保存
              doc.ref.set(
                {
                  posts: { [data.index]: [...posts] },
                },
                // 上書きを許可するかどうか
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
  });
