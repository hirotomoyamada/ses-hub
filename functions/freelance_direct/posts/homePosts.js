const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const dummy = require("../../dummy").dummy;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.homePosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated(context);
    const demo = checkDemo(context);

    const { posts, hit } = await fetchAlgolia(context, data, status, demo);

    posts.length && (await fetchFirestore(data, posts, demo));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (context, data, status, demo) => {
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

  if (data.index === "matters") {
    const results = await index
      .search("", {
        queryLanguages: ["ja", "en"],
        similarQuery: value,
        filters: "display:public",
        page: hit.currentPage,
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });

    hit.posts = results?.nbHits;
    hit.pages = results?.nbPages;

    const posts = results?.hits
      .map((hit) => hit && status && fetch.matters({ hit: hit }))
      ?.filter((post) => post);

    return { posts, hit };
  } else {
    const { results } = await index
      .getObjects(
        data.follows.slice(
          hit.currentPage * hitsPerPage,
          hitsPerPage * (hit.currentPage + 1)
        )
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });

    const posts = results
      ?.map(
        (hit) =>
          hit &&
          hit.status === "enable" &&
          status &&
          fetch.companys({ hit: hit, demo: demo })
      )
      ?.filter((post) => post);

    return { posts, hit };
  }
};

const fetchFirestore = async (data, posts, demo) => {
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
        if (data.index === "matters") {
          if (
            doc.data().payment.status === "canceled" ||
            !doc.data().payment.option?.freelanceDirect
          ) {
            posts[i].user = {
              type: "individual",
              name: null,
              person: "存在しないユーザー",
            };
          } else {
            posts[i].user = {
              type: doc.data().type,
              name: !demo ? doc.data().profile.name : dummy("name"),
              person: !demo ? doc.data().profile.person : dummy("person"),
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
            posts[i].type = doc.data().type;
          }
        }
      }
    }
  }
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.freelance_direct.uid;
};
