const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.userPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated(context);

    const index = algolia.initIndex(data.index);

    const hitsPerPage = 50;

    const hit = !data.uids
      ? {
          currentPage: data.page ? data.page : 0,
        }
      : {
          posts: data.uids.length,
          pages: Math.ceil(data.uids.length / 50),
          currentPage: data.page ? data.page : 0,
        };

    const posts = !data.uids
      ? await index
          .search(data.uid, {
            filters:
              data.uid !== context.auth.uid
                ? "display:public"
                : data.display && data.status
                ? `display:${data.display} AND status:${data.status}`
                : data.display
                ? `display:${data.display}`
                : data.status
                ? `status:${data.status}`
                : "",
            page: hit.currentPage,
          })
          .then((result) => {
            hit.posts = result.nbHits;
            hit.pages = result.nbPages;
            return result.hits.map((hit) =>
              data.index === "matters" && hit.uid === context.auth.uid
                ? fetch.matters({ hit: hit, auth: true })
                : data.index === "matters" && status
                ? fetch.matters({ hit: hit })
                : data.index === "resources" && hit.uid === context.auth.uid
                ? fetch.resources({ hit: hit, auth: true })
                : data.index === "resources" &&
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
          })
      : await index
          .getObjects(
            data.uids.slice(
              hit.currentPage * hitsPerPage,
              hitsPerPage * (hit.currentPage + 1)
            )
          )
          .then(({ results }) => {
            return results.map(
              (hit) =>
                hit &&
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

    if (data.index === "companys") {
      for (let i = 0; i < posts.length; i++) {
        posts[i] &&
          (await db
            .collection(data.index)
            .doc(posts[i].uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                posts[i].icon = doc.data().icon;
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
    }

    return { index: data.index, posts: posts, hit: hit };
  });
