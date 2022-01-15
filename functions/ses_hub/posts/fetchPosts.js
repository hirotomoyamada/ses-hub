const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.fetchPosts = functions
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
  const index = algolia.initIndex(
    !data.target || data.target === "createAt"
      ? data.index
      : `${data.index}_${data.target}_${data.type}`
  );

  const hit = {
    currentPage: data.page ? data.page : 0,
  };

  const posts = await index
    .search(
      data.value,
      data.index === "matters" || data.index === "resources"
        ? {
            filters: "display:public",
            page: hit.currentPage,
          }
        : data.index === "companys"
        ? {
            filters: "status:enable AND (plan:enable OR type:individual)",
            page: hit.currentPage,
          }
        : data.index === "persons" && {
            filters: "status:enable",
            page: hit.currentPage,
          }
    )
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
          : data.index === "resources" && status
          ? fetch.resources({ hit: hit })
          : data.index === "companys" && hit.person && status
          ? fetch.companys({ hit: hit, demo: demo })
          : data.index === "persons" && status && fetch.persons({ hit: hit })
      );
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  return { posts, hit };
};

const fetchFirestore = async (context, data, posts) => {
  for (let i = 0; i < posts.length; i++) {
    posts[i] &&
      (await db
        .collection(
          data.index === "matters" || data.index === "resources"
            ? "companys"
            : data.index
        )
        .doc(posts[i].uid)
        .get()
        .then((doc) => {
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
                      : doc.data().requests?.hold?.indexOf(context.auth.uid) >=
                        0
                      ? "hold"
                      : doc
                          .data()
                          .requests?.disable?.indexOf(context.auth.uid) >= 0
                      ? "hold"
                      : "none";
                } else {
                  posts[i] = false;
                }
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
        }));
  }

  return;
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.ses_hub.uid;
};
