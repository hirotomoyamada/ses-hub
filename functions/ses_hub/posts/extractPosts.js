const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.extractPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated(context);

    const index = algolia.initIndex(data.index);

    const objectIDs = data.objectIDs;

    const hitsPerPage = 50;

    const hit = {
      posts: objectIDs.length,
      pages: Math.ceil(objectIDs.length / 50),
      currentPage: data.page ? data.page : 0,
    };

    const posts = await index
      .getObjects(
        objectIDs.slice(
          hit.currentPage * hitsPerPage,
          hitsPerPage * (hit.currentPage + 1)
        )
      )
      .then(({ results }) => {
        return results.map((hit) =>
          hit && data.index === "matters" && hit.uid === context.auth.uid
            ? fetch.matters({ hit: hit, auth: true })
            : hit &&
              data.index === "matters" &&
              hit.display === "public" &&
              status
            ? fetch.matters({ hit: hit })
            : hit && data.index === "resources" && hit.uid === context.auth.uid
            ? fetch.resources({ hit: hit, auth: true })
            : hit &&
              data.index === "resources" &&
              hit.display === "public" &&
              status
            ? fetch.resources({ hit: hit })
            : hit &&
              data.index === "companys" &&
              hit.status === "enable" &&
              status && {
                uid: hit.objectID,
                profile: {
                  name: hit.name,
                  person: hit.person,
                  body: hit.body,
                },
              }
        );
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });

    if (data.index === "companys" || data.index === "persons") {
      for (let i = 0; i < posts.length; i++) {
        posts[i] &&
          (await db
            .collection(data.index)
            .doc(posts[i].uid)
            .get()
            .then((doc) => {
              posts[i].icon = doc.data().icon;
            })
            .catch((e) => {
              throw new functions.https.HttpsError(
                "not-found",
                "ユーザーの取得に失敗しました",
                "firebase"
              );
            }));
      }
    }

    return { index: data.index, posts: posts, hit: hit };
  });
