const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const fetch = require("./fetch/fetch");

exports.promotionPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data) => {
    const index = algolia.initIndex(data.index);

    const posts = await index
      .search("", {
        filters: "display:public",
        hitsPerPage: 8,
      })
      .then((result) => {
        return result.hits.map((hit) =>
          data.index === "matters"
            ? fetch.matters({ hit: hit, promotion: true })
            : data.index === "resources" &&
              fetch.resources({ hit: hit, promotion: true })
        );
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });

    return { index: data.index, posts: posts };
  });
