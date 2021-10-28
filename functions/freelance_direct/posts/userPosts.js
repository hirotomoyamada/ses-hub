const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.userPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated(context);

    await checkUser(data);

    const { posts, hit } = await fetchAlgolia(data, status);

    return { posts: posts, hit: hit };
  });

const checkUser = async (data) => {
  await db
    .collection("companys")
    .doc(data.uid)
    .get()
    .then((doc) => {
      if (
        doc.data().payment.status === "canceled" ||
        !doc.data().payment.option?.freelanceDirect
      ) {
        throw new functions.https.HttpsError(
          "cancelled",
          "オプション未加入のユーザーのため、処理中止",
          "firebase"
        );
      }
    });
};

const fetchAlgolia = async (data, status) => {
  const index = algolia.initIndex("matters");

  const hit = {
    currentPage: data.page ? data.page : 0,
  };

  const posts = await index
    .search(data.uid, {
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
    });

  return { posts, hit };
};
