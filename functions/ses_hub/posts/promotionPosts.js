const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

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
            ? {
                objectID: hit.objectID,
                title: hit.title,
                position: hit.position,
                body: hit.body,
                location: hit.location,
                costs:
                  hit.costs.display === "public"
                    ? {
                        display: hit.costs.display,
                        min: hit.costs.min,
                        max: hit.costs.max,
                      }
                    : {
                        display: hit.costs.display,
                        type: hit.costs.type,
                      },
                adjustment: hit.adjustment,
                times: hit.times,
                handles: hit.handles,
                remote: hit.remote,
                uid: hit.uid,
                createAt: hit.createAt,
              }
            : data.index === "resources" && {
                objectID: hit.objectID,
                roman: {
                  firstName: hit.roman.firstName.substring(0, 1),
                  lastName: hit.roman.lastName.substring(0, 1),
                },
                position: hit.position,
                body: hit.body,
                belong: hit.belong,
                station: hit.station,
                period: hit.period,
                costs:
                  hit.costs.display === "public"
                    ? {
                        display: hit.costs.display,
                        min: hit.costs.min,
                        max: hit.costs.max,
                      }
                    : {
                        display: hit.costs.display,
                        type: hit.costs.type,
                      },
                handles: hit.handles,
                uid: hit.uid,
                createAt: hit.createAt,
              }
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
