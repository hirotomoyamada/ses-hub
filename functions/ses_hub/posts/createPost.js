const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const postAuthenticated =
  require("./functions/postAuthenticated").postAuthenticated;
const post = require("./post/post");

exports.createPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await postAuthenticated(context);

    const index = algolia.initIndex(data.index);
    const object =
      data.index === "matters"
        ? post.matters({ data: data, context: context })
        : data.index === "resources" &&
          post.resources({ data: data, context: context });

    await index
      .saveObject(object, { autoGenerateObjectIDIfNotExist: true })
      .then(async (post) => {
        object.objectID = post.objectID;

        await db
          .collection("companys")
          .doc(context.auth.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const posts = doc.data().posts?.[data.index];
              doc.ref
                .set(
                  posts
                    ? {
                        posts: { [data.index]: [post.objectID, ...posts] },
                      }
                    : { posts: { [data.index]: [post.objectID] } },
                  { merge: true }
                )
                .catch((e) => {
                  throw new functions.https.HttpsError(
                    "unavailable",
                    "プロフィールの更新に失敗しました",
                    "disable"
                  );
                });
            }
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "プロフィールが存在しません",
              "profile"
            );
          });
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    return { index: data.index, post: object };
  });
