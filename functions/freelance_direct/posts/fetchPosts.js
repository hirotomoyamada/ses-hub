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

    const { posts, hit } = await fetchAlgolia(data, status);

    await fetchFirestore(data, posts);

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (data, status) => {
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
            filters: "status:enable AND plan:enable AND freelanceDirect:enable",
            page: hit.currentPage,
          }
    )
    .then((result) => {
      hit.posts = result.nbHits;
      hit.pages = result.nbPages;
      return result.hits.map((hit) =>
        data.index === "matters" && status
          ? fetch.matters({ hit: hit })
          : data.index === "companys" && status && fetch.companys({ hit: hit })
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
            if (
              data.index === "matters" &&
              (doc.data().payment.status === "canceled" ||
                !doc.data().payment.option?.freelanceDirect)
            ) {
              posts[i].costs.display = "private";
              posts[i].costs.type = "応談";
              posts[i].costs.min = 0;
              posts[i].costs.max = 0;
            }

            if (data.index === "companys") {
              if (
                doc.data().payment.status === "canceled" ||
                !doc.data().payment.option?.freelanceDirect
              ) {
                posts[i].icon = "none";
                posts[i].status = "none";
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

  return;
};
