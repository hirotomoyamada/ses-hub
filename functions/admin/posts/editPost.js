const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;
const edit = require("../edit/edit");

/**********************************
 * 案件・人材 投稿を編集
 **********************************/

exports.editPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    const index = algolia.initIndex(data.index);
    // indexに応じてオブジェクトを整形
    const post =
      data.index === "matters"
        ? edit.matters(data)
        : data.index === "resources" && edit.resources(data);

    // Algoliaへ投稿を上書き保存
    await index
      .partialUpdateObject(
        post,
        // オブジェクトがなければ処理中止
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
