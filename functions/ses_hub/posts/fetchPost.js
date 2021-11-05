const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const dummy = require("../../dummy").dummy;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.fetchPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated({ context: context });
    const demo = context.auth.uid === functions.config().demo.ses_hub.uid;

    const post = await fetchalgolia(context, data, status, demo);

    const bests = await fetchBests(context, data, status, post);

    return { post: post, bests: bests };
  });

const fetchalgolia = async (context, data, status, demo) => {
  const index = algolia.initIndex(data.index);

  const post = await index
    .getObject(data.objectID)
    .then((hit) => {
      return hit && data.index === "matters" && hit.uid === context.auth.uid
        ? fetch.matters({ hit: hit, auth: true })
        : hit && data.index === "matters" && hit.display === "public" && status
        ? fetch.matters({ hit: hit })
        : data.index === "resources" && hit.uid === context.auth.uid
        ? fetch.resources({ hit: hit, auth: true })
        : data.index === "resources" &&
          hit.display === "public" &&
          status &&
          fetch.resources({ hit: hit });
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  await fetchFirestore(demo, post);

  return post;
};

const fetchFirestore = async (demo, post) => {
  await db
    .collection("companys")
    .doc(post.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        post.user = {
          uid: doc.id,
          icon: doc.data().icon,
          type: doc.data().type,
          profile: {
            name: !demo ? doc.data().profile.name : dummy("name"),
            person: !demo ? doc.data().profile.person : dummy("person"),
            body: doc.data().profile.body,
            email: !demo ? doc.data().profile.email : null,
            social: !demo ? doc.data().profile.social : {},
          },
        };
      }
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });
};

const fetchBests = async (context, data, status, post) => {
  const index = algolia.initIndex(data.index);

  const bests = await index
    .search("", {
      queryLanguages: ["ja", "en"],
      similarQuery: post?.handles?.join(" "),
      filters: "display:public",
      hitsPerPage: 100,
    })

    .then(({ hits }) => {
      return hits.map((hit) =>
        data.index === "matters" &&
        hit.uid === context.auth.uid &&
        hit.objectID !== post.objectID
          ? fetch.matters({ hit: hit, auth: true })
          : data.index === "matters" && hit.objectID !== post.objectID && status
          ? fetch.matters({ hit: hit })
          : data.index === "resources" &&
            hit.uid === context.auth.uid &&
            hit.objectID !== post.objectID
          ? fetch.resources({ hit: hit, auth: true })
          : data.index === "resources" &&
            hit.objectID !== post.objectID &&
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

  return bests;
};
