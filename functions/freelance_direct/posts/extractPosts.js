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
    const demo = checkDemo(context);

<<<<<<< HEAD
    const { posts, hit } = await fetchAlgolia(data, status);
=======
    const { posts, hit } = await fetchAlgolia(data, status, demo);
>>>>>>> dev

    posts.length && (await fetchFirestore(data, posts));

    return { index: data.index, type: data.type, posts: posts, hit: hit };
  });

<<<<<<< HEAD
const fetchAlgolia = async (data, status) => {
  const index = algolia.initIndex(
    data.type !== "requests" ? "matters" : "companys"
  );

  const objectIDs = data.objectIDs;

  const hitsPerPage = 50;

  const hit = {
    posts: objectIDs.length,
    pages: Math.ceil(objectIDs.length / 50),
    currentPage: data.page ? data.page : 0,
  };

=======
const fetchAlgolia = async (data, status, demo) => {
  const index = algolia.initIndex(
    data.type !== "requests" ? "matters" : "companys"
  );

  const objectIDs = data.objectIDs;

  const hitsPerPage = 50;

  const hit = {
    posts: objectIDs.length,
    pages: Math.ceil(objectIDs.length / 50),
    currentPage: data.page ? data.page : 0,
  };

>>>>>>> dev
  const posts = await index
    .getObjects(
      objectIDs.slice(
        hit.currentPage * hitsPerPage,
        hitsPerPage * (hit.currentPage + 1)
      )
    )
    .then(({ results }) => {
      return results.map((hit) =>
        hit && data.index === "matters" && hit.display === "public" && status
          ? fetch.matters({ hit: hit })
          : hit &&
            data.type === "requests" &&
            hit.status === "enable" &&
            status &&
<<<<<<< HEAD
            fetch.companys({ hit: hit })
=======
            fetch.companys({ hit: hit, demo: demo })
>>>>>>> dev
      );
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });
<<<<<<< HEAD

  return { posts, hit };
};

=======

  return { posts, hit };
};

>>>>>>> dev
const fetchFirestore = async (data, posts) => {
  for (let i = 0; i < posts.length; i++) {
    posts[i] &&
      (await db
        .collection("companys")
        .doc(posts[i].uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (data.index === "matters") {
              if (
                !doc.data().payment.option &&
                !doc.data().payment.option?.freelanceDirect
              ) {
                posts[i].costs.display = "private";
                posts[i].costs.type = "応談";
                posts[i].costs.min = 0;
                posts[i].costs.max = 0;
              }
            }
            if (data.type === "requests") {
              if (
                doc.data().payment.status === "canceled" ||
                !doc.data().payment.option?.freelanceDirect
              ) {
                posts[i].icon = "none";
                posts[i].status = "none";
<<<<<<< HEAD
=======
                posts[i].type = "individual";
>>>>>>> dev
                posts[i].profile = {
                  name: null,
                  person: "存在しないユーザー",
                  body: null,
                };
              } else {
                posts[i].icon = doc.data().icon;
                posts[i].type = doc.data().type;
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
};
<<<<<<< HEAD
=======

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.freelance_direct.uid;
};
>>>>>>> dev
