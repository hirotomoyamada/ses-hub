const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.fetchPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated(context);
    const demo = checkDemo(context);

    const post = await fetchAlgolia(data, status, demo);
    const bests = await fetchBests(status, post);

    !demo && (await addHistory(context, data));

    return { post: post, bests: bests };
  });

const fetchAlgolia = async (data, status, demo) => {
  const index = algolia.initIndex("matters");

  const hit = await index.getObject(data).catch((e) => {
    throw new functions.https.HttpsError(
      "not-found",
      "投稿の取得に失敗しました",
      "algolia"
    );
  });

  const post =
    hit && hit?.display === "public" && status && fetch.matters({ hit: hit });

  post && (await fetchFirestore({ demo: demo, post: post }));

  return post;
};

const fetchFirestore = async ({ demo, post, i, bests }) => {
  const doc = await db
    .collection("companys")
    .doc(!bests ? post.uid : bests[i].uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    if (!bests) {
      if (
        doc.data().payment.status === "canceled" ||
        !doc.data().payment.option?.freelanceDirect
      ) {
        post.costs.display = "private";
        post.costs.type = "応談";
        post.costs.min = 0;
        post.costs.max = 0;

        post.uid = null;

        post.user = fetch.companys({ doc: doc, demo: demo, none: true });
      } else {
        post.user = fetch.companys({ doc: doc, demo: demo });
      }
    } else {
      if (
        doc.data().payment.status === "canceled" ||
        !doc.data().payment.option?.freelanceDirect
      ) {
        bests[i].costs.display = "private";
        bests[i].costs.type = "応談";
        bests[i].costs.min = 0;
        bests[i].costs.max = 0;
      }
    }
  }

  return;
};

const fetchBests = async (status, post) => {
  const index = algolia.initIndex("matters");

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
    ?.map(
      (hit) =>
        hit &&
        hit.objectID !== post.objectID &&
        status &&
        fetch.matters({ hit: hit })
    )
    ?.filter((post) => post);

  if (bests) {
    for (let i = 0; i < bests.length; i++) {
      bests[i] && (await fetchFirestore({ i: i, bests: bests }));
    }

    return bests;
  }
};

const addHistory = async (context, data) => {
  const doc = await db
    .collection("persons")
    .doc(context.auth.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const histories = doc
      .data()
      .histories.filter((objectID) => objectID !== data);

    await doc.ref
      .set(
        {
          histories: [data, ...histories].slice(0, 100),
        },
        { merge: true }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プロフィールの更新に失敗しました",
          "firebase"
        );
      });
  }

  return;
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.freelance_direct.uid;
};
