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
    await userAuthenticated({ context: context });

    const demo = checkDemo(context);

    const { posts, hit } = !data.uids
      ? await fetchPosts(context, data)
      : await fetchFollows(data, demo);

    posts.length &&
      data.index === "companys" &&
      (await fetchFirestore(data, posts));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchPosts = async (context, data) => {
  const index = algolia.initIndex(data.index);

  const hit = {
    currentPage: data.page ? data.page : 0,
  };

  const result = await index
    .search(data.uid, {
      filters:
        data.uid !== context.auth.uid
          ? "display:public"
          : data.display && data.status
          ? `display:${data.display} AND status:${data.status}`
          : data.display
          ? `display:${data.display}`
          : data.status
          ? `status:${data.status}`
          : "",
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
    data.index === "matters" && hit.uid === context.auth.uid
      ? fetch.matters({ hit: hit, auth: true })
      : data.index === "matters"
      ? fetch.matters({ hit: hit })
      : data.index === "resources" && hit.uid === context.auth.uid
      ? fetch.resources({ hit: hit, auth: true })
      : data.index === "resources" && fetch.resources({ hit: hit })
  );

  return { posts, hit };
};

const fetchFollows = async (data, demo) => {
  const index = algolia.initIndex(data.index);

  const hitsPerPage = 50;

  const hit = {
    posts: data.uids.length,
    pages: Math.ceil(data.uids.length / 50),
    currentPage: data.page ? data.page : 0,
  };

  const { results } = await index
    .getObjects(
      data.uids.slice(
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
        fetch.companys({ hit: hit, demo: demo })
    )
    ?.filter((post) => post);

  return { posts, hit };
};

const fetchFirestore = async (data, posts) => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i]) {
      const doc = await db
        .collection(data.index)
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
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.ses_hub.uid;
};
