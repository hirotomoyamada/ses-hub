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
    const demo = checkDemo(context);

    const { posts, hit } = await fetchAlgolia(data, status, demo);

    await fetchFirestore(data, posts);

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (data, status, demo) => {
  const index = algolia.initIndex(
    !data.target || data.target === "createAt"
      ? data.index
      : `${data.index}_${data.target}_${data.type}`
  );

  const hit = {
    currentPage: data.page ? data.page : 0,
  };

  const result = await index
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
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  hit.posts = result?.nbHits;
  hit.pages = result?.nbPages;

  const posts = result?.hits?.map((hit) =>
    data.index === "matters" && status
      ? fetch.matters({ hit: hit })
      : data.index === "companys" &&
        hit.person &&
        status &&
        fetch.companys({ hit: hit, demo: demo })
  );

  return { posts, hit };
};

const fetchFirestore = async (data, posts) => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i]) {
      const doc = await db
        .collection("companys")
        .doc(posts[i].uid)
        .get()
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "ユーザーの取得に失敗しました",
            "firebase"
          );
        });

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
            posts[i].type = "individual";
            posts[i].profile = {
              name: null,
              person: "存在しないユーザー",
              body: null,
            };
          } else {
            posts[i].icon = doc.data().icon;
            posts[i].type = doc.data().type;
          }
        }
      }
    }
  }

  return;
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.freelance_direct.uid;
};
