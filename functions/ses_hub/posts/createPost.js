const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const postAuthenticated =
  require("./functions/postAuthenticated").postAuthenticated;
const post = require("./edit/edit");

exports.createPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await postAuthenticated({ context: context });

    const object = await createAlgolia(context, data);

    await createFirestore(context, data, object);

    return { index: data.index, post: object };
  });

const createAlgolia = async (context, data) => {
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
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return object;
};

const createFirestore = async (context, data, object) => {
  const doc = await db
    .collection("companys")
    .doc(context.auth.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "プロフィールが存在しません",
        "profile"
      );
    });

  if (doc.exists) {
    const posts = doc.data().posts?.[data.index];
    doc.ref
      .set(
        posts
          ? {
              posts: { [data.index]: [object.objectID, ...posts] },
            }
          : { posts: { [data.index]: [object.objectID] } },
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
};
