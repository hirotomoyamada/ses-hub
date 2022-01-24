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

  const hit = await index.getObject(data.objectID).catch((e) => {
    throw new functions.https.HttpsError(
      "not-found",
      "投稿の取得に失敗しました",
      "algolia"
    );
  });

  const post =
    hit && data.index === "matters" && hit.uid === context.auth.uid
      ? fetch.matters({ hit: hit, auth: true })
      : hit && data.index === "matters" && hit.display === "public" && status
      ? fetch.matters({ hit: hit })
      : data.index === "resources" && hit.uid === context.auth.uid
      ? fetch.resources({ hit: hit, auth: true })
      : data.index === "resources" &&
        hit.display === "public" &&
        status &&
        fetch.resources({ hit: hit });

  await fetchFirestore(demo, post);

  return post;
};

const fetchFirestore = async (demo, post) => {
  const doc = await db
    .collection("companys")
    .doc(post.uid)
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
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "firebase"
      );
    }

    post.user = {
      uid: doc.id,
      icon: doc.data().icon,
      type: doc.data().type,
      profile: {
        name: !demo ? doc.data().profile.name : dummy("name"),
        person: !demo
          ? doc.data().profile.person
            ? doc.data().profile.person
            : "名無しさん"
          : dummy("person"),
        body: doc.data().profile.body,
        email: !demo ? doc.data().profile.email : null,
        social: !demo ? doc.data().profile.social : {},
      },
    };
  }
};

const fetchBests = async (context, data, status, post) => {
  const index = algolia.initIndex(data.index);

  const { hits } = await index
    .search("", {
      queryLanguages: ["ja", "en"],
      similarQuery: post?.handles?.join(" "),
      filters: "display:public",
      hitsPerPage: 100,
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  const bests = hits
    ?.map((hit) =>
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
    )
    ?.filter((post) => post);

  return bests;
};
