const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const fetch = require("../fetch/fetch");

exports.extractPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    const { posts, hit } = fetchAlgolia(data);

    await fetchFirestore(data, posts);

    return { index: data.index, type: data.type, posts: posts, hit: hit };
  });

const fetchFirestore = async (data, posts) => {
  if (!posts.length) {
    return;
  }

  if (
    (data.type === "requests" ||
      data.index === "companys" ||
      data.index === "persons") &&
    posts.length
  ) {
    for (let i = 0; i < posts.length; i++) {
      const doc = await db
        .collection(data.type !== "requests" ? data.index : "companys")
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
        if (data.type === "requests" || data.index === "companys") {
          fetch.companys({ posts: posts, index: i, doc: doc });
        }
        if (data.index === "persons") {
          fetch.persons({ posts: posts, index: i, doc: doc });
        }
      }
    }
  }

  return;
};

const fetchAlgolia = async (data) => {
  const index = algolia.initIndex(
    data.type !== "requests" ? data.index : "companys"
  );

  const objectIDs =
    data.user.index === "companys"
      ? data.type === "children"
        ? data.user.payment.children
        : data.type === "follows"
        ? data.user[data.type]
        : data.user[data.type][data.index]
      : data.user.index === "persons" && data.type !== "requests"
      ? data.user[data.type]
      : data.user[data.type][data.index];

  const hitsPerPage = 50;

  const hit = {
    posts: objectIDs.length,
    pages: Math.ceil(objectIDs.length / 50),
    currentPage: data.page ? data.page : 0,
  };

  const { results } = await index
    .getObjects(
      objectIDs.slice(
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
    ?.map((hit) =>
      hit && data.index === "matters"
        ? fetch.matters({ hit: hit })
        : hit && data.index === "resources"
        ? fetch.resources({ hit: hit })
        : hit && (data.type === "requests" || data.index === "companys")
        ? fetch.companys({ hit: hit })
        : hit && data.index === "persons" && fetch.persons({ hit: hit })
    )
    ?.filter((post) => post);

  return { posts, hit };
};
