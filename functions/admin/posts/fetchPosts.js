const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;
const fetch = require("../fetch/fetch");

exports.fetchPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    const { posts, hit } = await fetchAlgolia(data);

    await fetchFirestore(data, posts);

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchFirestore = async (data, posts) => {
  if (posts.length) {
    for (let i = 0; i < posts.length; i++) {
      const index = data.index !== "persons" ? "companys" : "persons";

      const doc = await db
        .collection(index)
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
        if (data.index === "matters" || data.index === "resources") {
          posts[i].user = {
            type: doc.data().type,
            name: doc.data().profile.name,
            person: doc.data().profile.person,
          };
        }

        if (data.index === "companys") {
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
    !data.target ||
      ((data.index === "matters" || data.index === "resources") &&
        data.target === "createAt") ||
      ((data.index === "companys" || data.index === "persons") &&
        data.target === "lastLogin")
      ? data.index
      : `${data.index}_${data.target}_${data.type}`
  );

  const hit = {
    currentPage: data.page ? data.page : 0,
  };

  const result = await index

    .search(data.value, {
      page: hit.currentPage,
      filters: data.filter === "all" ? "" : data.filter,
    })

    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  if (result) {
    hit.posts = result?.nbHits;
    hit.pages = result?.nbPages;

    const posts = result?.hits
      ?.map((hit) =>
        data.index === "matters"
          ? fetch.matters({ hit: hit })
          : data.index === "resources"
          ? fetch.resources({ hit: hit })
          : data.index === "companys"
          ? fetch.companys({ hit: hit })
          : data.index === "persons" && fetch.persons({ hit: hit })
      )
      ?.filter((post) => post);

    return { posts, hit };
  }
};
