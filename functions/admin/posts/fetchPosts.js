const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const fetch = require("../fetch/fetch");

exports.fetchPosts = functions
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

    const index = algolia.initIndex(
      !data.target ||
        ((data.index === "matters" || data.index === "resources") &&
          data.target === "createAt") ||
        ((data.index === "companys" || data.index === "persons") &&
          data.target === "lastLogin")
        ? data.index
        : `${data.index}_${data.target}_${data.type}`
    );
    const hit = {
      currentPage: data.page ? data.page : 0,
    };
    const posts = await index
      .search(data.value, {
        page: hit.currentPage,
        filters: data.filter === "all" ? "" : data.filter,
      })
      .then((result) => {
        hit.posts = result.nbHits;
        hit.pages = result.nbPages;
        const res = result.hits.map((hit) =>
          data.index === "matters"
            ? fetch.matters({ hit: hit })
            : data.index === "resources"
            ? fetch.resources({ hit: hit })
            : data.index === "companys"
            ? fetch.companys({ hit: hit })
            : data.index === "persons" && fetch.persons({ hit: hit })
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

    if (posts.length) {
      for (let i = 0; i < posts.length; i++) {
        await db
          .collection(
            data.index === "matters" ||
              data.index === "resources" ||
              data.index === "companys"
              ? "companys"
              : data.index === "persons" && "persons"
          )
          .doc(posts[i].uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (data.index === "matters" || data.index === "resources") {
                posts[i].user = {
                  type: doc.data().type,
                  name: doc.data().profile.name,
                  person: doc.data().profile.person,
                };
              }
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

    return { index: data.index, posts: posts, hit: hit };
  });
