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
    const demo = false;
    // context.auth.uid === functions.config().demo.ses_hub.uid;

    const index = algolia.initIndex("matters");
    const post = await index
      .getObject(data)
      .then((hit) => {
        return (
          hit &&
          hit.display === "public" &&
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

    await db
      .collection("companys")
      .doc(post.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (
            !doc.data().payment.option &&
            !doc.data().payment.option?.freelanceDirect
          ) {
            post.costs.display = "private";
            post.costs.type = "応談";
            post.costs.min = 0;
            post.costs.max = 0;

            post.uid = null;

            post.user = {
              uid: null,
              icon: "icon97",
              profile: {
                name: "Hit me up株式会社",
                person: "freelance Direct 事務局",
                body: null,
                email: !demo ? functions.config().admin.freelance_direct : null,
                social: null,
              },
            };
          } else {
            post.user = {
              uid: doc.id,
              icon: doc.data().icon,
              profile: {
                name: doc.data().profile.name,
                person: doc.data().profile.person,
                body: doc.data().profile.body,
                email: !demo ? doc.data().profile.email : null,
                social: !demo ? doc.data().profile.social : {},
              },
            };
          }
        }
      });

    const handles = post?.handles?.map((t) => t[Object.keys(t)]);
    const value = await handles?.join(" ");

    const bests = await index
      .search("", {
        queryLanguages: ["ja", "en"],
        similarQuery: value,
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
      bests[i] &&
        (await db
          .collection("companys")
          .doc(bests[i].uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              if (
                !doc.data().payment.option &&
                !doc.data().payment.option?.freelanceDirect
              ) {
                bests[i].costs.display = "private";
                bests[i].costs.type = "応談";
                bests[i].costs.min = 0;
                bests[i].costs.max = 0;
              }
            }
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "ユーザーの取得に失敗しました",
              "firebase"
            );
          }));
    }

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

    return { post: post, bests: bests };
  });
