const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.fetchPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated(context);

    const index = algolia.initIndex(
      !data.target || data.target === "createAt"
        ? data.index
        : `${data.index}_${data.target}_${data.type}`
    );

    const hit = {
      currentPage: data.page ? data.page : 0,
    };

    const posts = await index
      .search(
        data.value,
        data.index === "matters"
          ? {
              filters: "display:public",
              page: hit.currentPage,
            }
          : data.index === "companys" && {
              filters: "status:enable",
              page: hit.currentPage,
            }
      )
      .then((result) => {
        hit.posts = result.nbHits;
        hit.pages = result.nbPages;
        return result.hits.map((hit) =>
          data.index === "matters" && status
            ? fetch.matters({ hit: hit })
            : data.index === "companys" &&
              // 有料プランの制限追加
              status && {
                uid: hit.objectID,
                profile: {
                  name: hit.name,
                  person: hit.person,
                  body: hit.body,
                },
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

    for (let i = 0; i < posts.length; i++) {
      posts[i] &&
        (await db
          .collection("companys")
          .doc(posts[i].uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (data.index === "matters") {
                if (
                  !doc.data().payment.option &&
                  !doc.data().payment.option?.freelanceDirect
                ) {
                  posts[i].costs.display = "private";
                  posts[i].costs.type = "応談";
                  posts[i].costs.min = 0;
                  posts[i].costs.max = 0;
                }
              }
              if (data.index === "companys") {
                posts[i].icon = doc.data().icon;
              }
            }
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "ユーザーの取得に失敗しました",
              "firebase"
            );
          }));
    }

    return { index: data.index, posts: posts, hit: hit };
  });
