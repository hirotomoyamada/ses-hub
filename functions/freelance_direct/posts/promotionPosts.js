const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const fetch = require("./fetch/fetch");

exports.promotionPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data) => {
    const index = algolia.initIndex("matters");

    const posts = await index
      .search(data, {
        filters: "display:public",
        hitsPerPage: 8,
      })
      .then((result) => {
        return result.hits.map((hit) =>
          fetch.matters({ hit: hit, promotion: true })
        );
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });

    return posts;
  });
