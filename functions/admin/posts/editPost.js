const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const edit = require("./edit/edit");

exports.editPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid !== functions.config().admin.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "無効なユーザーのため、処理中止",
        "firebase"
      );
    }

    const index = algolia.initIndex(data.index);
    const post =
      data.index === "matters"
        ? edit.matters(data)
        : data.index === "resources" && edit.resources(data);

    await index.partialUpdateObject(post).catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "投稿の編集に失敗しました",
        "algolia"
      );
    });
  });
