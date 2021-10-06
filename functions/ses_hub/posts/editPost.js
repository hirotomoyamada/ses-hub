const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const postAuthenticated =
  require("./functions/postAuthenticated").postAuthenticated;
const post = require("./post/post");

exports.editPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await postAuthenticated({ context: context });

    if (context.auth.uid === data.post.uid) {
      const index = algolia.initIndex(data.index);
      const object =
        data.index === "matters"
          ? post.matters({ data: data, context: context, edit: true })
          : data.index === "resources" &&
            post.resources({ data: data, context: context, edit: true });

      await index.partialUpdateObject(object).catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "投稿の編集に失敗しました",
          "algolia"
        );
      });

      return;
    }
  });
