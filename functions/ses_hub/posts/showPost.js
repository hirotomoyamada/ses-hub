const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.showPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated(context);
    const demo = context.auth.uid === functions.config().demo.uid;

    const index = algolia.initIndex(data.index);
    const post = await index
      .getObject(data.objectID)
      .then((hit) => {
        return hit && data.index === "matters" && hit.uid === context.auth.uid
          ? fetch.matters({ hit: hit, auth: true })
          : hit &&
            data.index === "matters" &&
            hit.display === "public" &&
            status
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

    await db
      .collection("companys")
      .doc(post.uid)
      .get()
      .then((doc) => {
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
        return hits.map((hit) =>
          data.index === "matters" &&
          hit.uid === context.auth.uid &&
          hit.objectID !== post.objectID
            ? fetch.matters({ hit: hit, auth: true })
            : data.index === "matters" &&
              hit.objectID !== post.objectID &&
              status
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

    return { post: post, bests: bests };
  });
