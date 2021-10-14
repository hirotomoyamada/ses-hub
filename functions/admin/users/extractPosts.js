const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const fetch = require("../posts/fetch/fetch");

exports.extractPosts = functions
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
    const objectIDs =
      data.type === "follows"
        ? data.user[data.type]
        : data.user[data.type][data.index];
    const hitsPerPage = 50;
    const hit = {
      posts: objectIDs.length,
      pages: Math.ceil(objectIDs.length / 50),
      currentPage: data.page ? data.page : 0,
    };
    const posts = await index
      .getObjects(
        objectIDs.slice(
          hit.currentPage * hitsPerPage,
          hitsPerPage * (hit.currentPage + 1)
        )
      )
      .then(({ results }) => {
        const res = results.map((hit) =>
          hit && data.index === "matters"
            ? fetch.matters({ hit: hit })
            : hit && data.index === "resources"
            ? fetch.resources({ hit: hit })
            : hit && data.index === "companys"
            ? fetch.companys({ hit: hit })
            : hit && data.index === "persons" && fetch.persons({ hit: hit })
        );
        return res.filter((res) => res);
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });
    if (
      (data.index === "companys" || data.index === "persons") &&
      posts.length
    ) {
      for (let i = 0; i < posts.length; i++) {
        await db
          .collection(data.index)
          .doc(posts[i].uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (data.index === "companys") {
                fetch.companys({ posts: posts, index: i, doc: doc });
              }
              if (data.index === "persons") {
                fetch.persons({ posts: posts, index: i, doc: doc });
              }
            }
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "ユーザーの取得に失敗しました",
              "firebase"
            );
          });
      }
    }
    return { index: data.index, type: data.type, posts: posts, hit: hit };
  });
