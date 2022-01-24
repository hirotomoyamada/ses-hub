const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

exports.deletePost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    await deleteFirestore(data);
    await deleteAlgolia(data);

    return;
  });

const deleteFirestore = async (data) => {
  const doc = await db
    .collection("companys")
    .doc(data.post.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "投稿の削除に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const posts = doc
      .data()
      .posts[data.index].filter((objectID) => objectID !== data.post.objectID);

    doc.ref.set(
      {
        posts: { [data.index]: [...posts] },
      },
      { merge: true }
    );
  }

  return;
};

const deleteAlgolia = async (data) => {
  const index = algolia.initIndex(data.index);
  await index.deleteObject(data.post.objectID).catch((e) => {
    throw new functions.https.HttpsError(
      "data-loss",
      "投稿の削除に失敗しました",
      "algolia"
    );
  });

  return;
};
