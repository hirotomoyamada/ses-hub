const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.homePosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated(context);

    const { posts, hit } = await fetchAlgolia(context, data, status);

    posts.length && (await fetchFirestore(data, posts));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (context, data, status) => {
  const index = algolia.initIndex(data.index);
  const value =
    data.index === "matters" && [context.auth.uid, ...data.follows].join(" ");

  const hitsPerPage = 50;

  const hit =
    data.index === "matters"
      ? {
          currentPage: data.page ? data.page : 0,
        }
      : {
          posts: data.follows.length,
          pages: Math.ceil(data.follows.length / 50),
          currentPage: data.page ? data.page : 0,
        };

  const posts =
    data.index === "matters"
      ? await index
          .search("", {
            queryLanguages: ["ja", "en"],
            similarQuery: value,
            filters: "display:public",
            page: hit.currentPage,
          })
          .then((result) => {
            hit.posts = result.nbHits;
            hit.pages = result.nbPages;
            return result.hits.map(
              (hit) => hit && status && fetch.matters({ hit: hit })
            );
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "投稿の取得に失敗しました",
              "algolia"
            );
          })
      : await index
          .getObjects(
            data.follows.slice(
              hit.currentPage * hitsPerPage,
              hitsPerPage * (hit.currentPage + 1)
            )
          )
          .then(({ results }) => {
            return results.map(
              (hit) =>
                hit &&
                hit.status === "enable" &&
                status &&
                fetch.companys({ hit: hit })
            );
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "投稿の取得に失敗しました",
              "algolia"
            );
          });

  return { posts, hit };
};

const fetchFirestore = async (data, posts) => {
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
                doc.data().payment.status === "canceled" ||
                !doc.data().payment.option?.freelanceDirect
              ) {
                posts[i].user = {
                  name: null,
                  person: "存在しないユーザー",
                };
              } else {
                posts[i].user = {
                  type: doc.data().type,
                  name: doc.data().profile.name,
                  person: doc.data().profile.person,
                };
              }
            } else {
              if (
                doc.data().payment.status === "canceled" ||
                !doc.data().payment.option?.freelanceDirect
              ) {
                posts[i].icon = "none";
                posts[i].status = "none";
                posts[i].type = "individual";
                posts[i].profile = {
                  name: null,
                  person: "存在しないユーザー",
                  body: null,
                };
              } else {
                posts[i].icon = doc.data().icon;
              }
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
};
