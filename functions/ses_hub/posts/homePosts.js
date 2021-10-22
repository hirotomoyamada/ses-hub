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
    const status = await userAuthenticated({ context: context });

    const { posts, hit } = await fetchAlgolia(context, data, status);

    posts.length && (await fetchFiretore(posts));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (context, data, status) => {
  const index = algolia.initIndex(data.index);
  const value = [context.auth.uid, ...data.follows].join(" ");

  const hit = {
    currentPage: data.page ? data.page : 0,
  };

  const posts = await index
    .search("", {
      queryLanguages: ["ja", "en"],
      similarQuery: value,
      filters: "display:public",
      page: hit.currentPage,
    })
    .then((result) => {
      hit.posts = result.nbHits;
      hit.pages = result.nbPages;
      return result.hits.map((hit) =>
        hit && data.index === "matters" && hit.uid === context.auth.uid
          ? fetch.matters({ hit: hit, auth: true })
          : hit && data.index === "matters" && status
          ? fetch.matters({ hit: hit })
          : hit && data.index === "resources" && hit.uid === context.auth.uid
          ? fetch.resources({ hit: hit, auth: true })
          : hit &&
            data.index === "resources" &&
            status &&
            fetch.resources({ hit: hit })
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

const fetchFiretore = async (posts) => {
  for (let i = 0; i < posts.length; i++) {
    posts[i] &&
      (await db
        .collection("companys")
        .doc(posts[i].uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            posts[i].user = {
              name: doc.data().profile.name,
              person: doc.data().profile.person,
            };
          } else {
            posts[i].user = {
              person: "不明なメンバー",
            };
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
