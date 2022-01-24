const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;
const edit = require("../edit/edit");

exports.editPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    const index = algolia.initIndex(data.index);
    const post =
      data.index === "matters"
        ? edit.matters(data)
        : data.index === "resources" && edit.resources(data);

    await index
      .partialUpdateObject(
        post,
        {
          createIfNotExists: false,
        }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "投稿の編集に失敗しました",
          "algolia"
        );
      });
  });
