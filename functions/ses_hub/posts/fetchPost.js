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
    const status = await userAuthenticated({
      context: context,
      canceled: true,
    });
    const demo = context.auth.uid === functions.config().demo.ses_hub.uid;

    const post = await fetchalgolia(context, data, demo, status);

    const bests = await fetchBests(context, data, post);

    return { post: post, bests: bests };
  });

const fetchalgolia = async (context, data, demo, status) => {
  const index = algolia.initIndex(data.index);

  const hit = await index.getObject(data.objectID).catch((e) => {
    throw new functions.https.HttpsError(
      "not-found",
      "投稿の取得に失敗しました",
      "notFound"
    );
  });

  const post =
    hit && data.index === "matters" && hit.uid === context.auth.uid
      ? fetch.matters({ hit: hit, auth: true })
      : hit && data.index === "matters" && hit.display === "public"
      ? fetch.matters({ hit: hit })
      : data.index === "resources" && hit.uid === context.auth.uid
      ? fetch.resources({ hit: hit, auth: true })
      : data.index === "resources" &&
        hit.display === "public" &&
        fetch.resources({ hit: hit });

  await fetchFirestore(demo, post, status);

  context.auth.uid !== post.uid && (await updateLimit(context));

  return post;
};

const updateLimit = async (context) => {
  const doc = await db.collection("companys").doc(context.auth.uid).get();

  if (doc.exists && doc.data().payment.status === "canceled") {
    const limit = doc.data().payment?.limit;

    if (limit <= 0 || !limit) {
      throw new functions.https.HttpsError(
        "cancelled",
        "閲覧回数の上限を超えたため、閲覧することができません",
        "limit"
      );
    } else {
      await doc.ref
        .set({ payment: { limit: limit ? limit - 1 : 0 } }, { merge: true })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "data-loss",
            "閲覧回数の更新に失敗しました",
            "firebase"
          );
        });
    }
  }

  return;
};

const fetchFirestore = async (demo, post, status) => {
  const doc = await db
    .collection("companys")
    .doc(post.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "notFound"
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
        "notFound"
      );
    }

    post.user = {
      uid: doc.id,
      icon: doc.data().icon,
      type: doc.data().type,
      status: doc.data().payment.status,
      profile: {
        name: !demo ? doc.data().profile.name : dummy("name"),
        person: !demo
          ? doc.data().profile.person
            ? doc.data().profile.person
            : "名無しさん"
          : dummy("person"),
        body: doc.data().profile.body,
        email: !demo ? doc.data().profile.email : null,
        social: !demo && status ? doc.data().profile.social : {},
      },
    };
  }
};

const fetchBests = async (context, data, post) => {
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
        : data.index === "matters" && hit.objectID !== post.objectID
        ? fetch.matters({ hit: hit })
        : data.index === "resources" &&
          hit.uid === context.auth.uid &&
          hit.objectID !== post.objectID
        ? fetch.resources({ hit: hit, auth: true })
        : data.index === "resources" &&
          hit.objectID !== post.objectID &&
          fetch.resources({ hit: hit })
    )
    ?.filter((post) => post);

  return bests;
};
