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
    const status = await userAuthenticated({
      context: context,
      index: data.index,
    });

    const demo = checkDemo(context);

    const { posts, hit } = await fetchAlgolia(context, data, status, demo);

    posts.length && (await fetchFirestore(context, data, posts));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (context, data, status, demo) => {
  const index = algolia.initIndex(data.index);

  const objectIDs = data.objectIDs;

  const hitsPerPage = 50;

  const hit = {
    posts: objectIDs.length,
    pages: Math.ceil(objectIDs.length / 50),
    currentPage: data.page ? data.page : 0,
  };

  const { results } = await index
    .getObjects(
      objectIDs.slice(
        hit.currentPage * hitsPerPage,
        hitsPerPage * (hit.currentPage + 1)
      )
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  const posts = results
    ?.map((hit) =>
      hit && data.index === "matters" && hit.uid === context.auth.uid
        ? fetch.matters({ hit: hit, auth: true })
        : hit && data.index === "matters" && hit.display === "public" && status
        ? fetch.matters({ hit: hit })
        : hit && data.index === "resources" && hit.uid === context.auth.uid
        ? fetch.resources({ hit: hit, auth: true })
        : hit &&
          data.index === "resources" &&
          hit.display === "public" &&
          status
        ? fetch.resources({ hit: hit })
        : hit && data.index === "companys" && hit.status === "enable" && status
        ? fetch.companys({ hit: hit, demo: demo })
        : hit &&
          data.index === "persons" &&
          hit.status === "enable" &&
          status &&
          fetch.persons({ hit: hit })
    )
    ?.filter((post) => post);

  return { posts, hit };
};

const fetchFirestore = async (context, data, posts) => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i]) {
      const doc = await db
        .collection(
          data.index === "matters" || data.index === "resources"
            ? "companys"
            : data.index
        )
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
          if (
            doc.data().type !== "individual" &&
            doc.data().payment.status === "canceled"
          ) {
            posts[i] = false;
          }
        }

        if (data.index === "companys" || data.index === "persons") {
          if (data.index === "companys") {
            posts[i].icon = doc.data().icon;
            posts[i].type = doc.data().type;
          }

          if (data.index === "persons") {
            if (doc.data().profile.nickName) {
              posts[i].icon = doc.data().icon;
              posts[i].request =
                doc.data().requests?.enable?.indexOf(context.auth.uid) >= 0
                  ? "enable"
                  : doc.data().requests?.hold?.indexOf(context.auth.uid) >= 0
                  ? "hold"
                  : doc.data().requests?.disable?.indexOf(context.auth.uid) >= 0
                  ? "hold"
                  : "none";
            } else {
              posts[i] = false;
            }
          }
        }
      }
    }
  }
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.ses_hub.uid;
};
