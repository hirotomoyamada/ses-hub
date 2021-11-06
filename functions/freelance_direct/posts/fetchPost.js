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
<<<<<<< HEAD
    const demo =
      context.auth.uid === functions.config().demo.freelance_direct.uid;
=======
    const demo = checkDemo(context);
>>>>>>> dev

    const post = await fetchAlgolia(data, status, demo);

    const bests = await fetchBests(status, post);

<<<<<<< HEAD
    await addHistory(context, data);
=======
    !demo && (await addHistory(context, data));
>>>>>>> dev

    return { post: post, bests: bests };
  });

const fetchAlgolia = async (data, status, demo) => {
  const index = algolia.initIndex("matters");

  const post = await index
    .getObject(data)
    .then((hit) => {
      return (
        hit && hit.display === "public" && status && fetch.matters({ hit: hit })
      );
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  await fetchFirestore({ demo: demo, post: post });

  return post;
};

const fetchFirestore = async ({ demo, post, i, bests }) => {
  await db
    .collection("companys")
    .doc(!bests ? post.uid : bests[i].uid)
    .get()
    .then((doc) => {
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
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });
};

const fetchBests = async (status, post) => {
  const index = algolia.initIndex("matters");

  const bests = await index
    .search("", {
      queryLanguages: ["ja", "en"],
      similarQuery: post?.handles?.join(" "),
      filters: "display:public",
      hitsPerPage: 100,
    })
    .then(({ hits }) => {
      return hits.map(
        (hit) =>
          hit &&
          hit.objectID !== post.objectID &&
          status &&
          fetch.matters({ hit: hit })
      );
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  for (let i = 0; i < bests.length; i++) {
    bests[i] && (await fetchFirestore({ i: i, bests: bests }));
  }

  return bests;
};

const addHistory = async (context, data) => {
  await db
    .collection("persons")
    .doc(context.auth.uid)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        const history = doc
          .data()
          .history.filter((objectID) => objectID !== data);

        await doc.ref
          .set(
            {
              history: [data, ...history].slice(0, 100),
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
    });
};
<<<<<<< HEAD
=======

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.freelance_direct.uid;
};
>>>>>>> dev
