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
    const status = await userAuthenticated({ context: context });

    const demo = checkDemo(context);

    const { posts, hit } = await fetchAlgolia(context, data, status, demo);

    posts.length && (await fetchFiretore(posts, demo));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (context, data, status) => {
  const index = algolia.initIndex(data.index);
  const value = [context.auth.uid, ...data.follows].join(" ");

  const hit = {
    currentPage: data.page ? data.page : 0,
  };

  const result = await index
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

  hit.posts = result?.nbHits;
  hit.pages = result?.nbPages;

  const posts = result?.hits?.map((hit) =>
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

  return { posts, hit };
};

const fetchFiretore = async (posts, demo) => {
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
          doc.data().type !== "individual" &&
          doc.data().payment.status === "canceled"
        ) {
          posts[i] = false;
        } else {
          posts[i].user = {
            type: doc.data().type,
            name: !demo ? doc.data().profile.name : dummy("name"),
            person: !demo ? doc.data().profile.person : dummy("person"),
          };
        }
      } else {
        posts[i].user = {
          person: "不明なメンバー",
        };
      }
    }
  }
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.ses_hub.uid;
};
