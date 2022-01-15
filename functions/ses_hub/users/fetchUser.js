const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const dummy = require("../../dummy").dummy;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const fetch = require("./fetch/fetch");

exports.fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      context: context,
      canceled: true,
      index: data.index,
    });

    const demo = checkDemo(context);
    const user = await fetchProfile(context, data, demo);
    const bests = data.index === "persons" && (await fetchBests(user, data));

    return { user: user, bests: bests };
  });

const fetchProfile = async (context, data, demo) => {
  const user = await fetchAlgolia(data, demo);

  await fetchFirestore(context, data, user);

  return user;
};

const fetchAlgolia = async (data, demo) => {
  const index = algolia.initIndex(data.index);

  const user = !data.uids
    ? await index
        .getObject(data.uid)
        .then((hit) => {
          return hit && data.index === "companys"
            ? fetch.companys({ hit: hit, demo: demo })
            : data.index === "persons" &&
                fetch.persons({ hit: hit, demo: demo });
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "プロフィールの取得に失敗しました",
            "algolia"
          );
        })
    : await index
        .getObjects(data.uids)
        .then(({ results }) => {
          return results.map(
            (hit) => hit && fetch.companys({ hit: hit, demo: demo })
          );
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "プロフィールの取得に失敗しました",
            "algolia"
          );
        });

  return user;
};

const fetchFirestore = async (context, data, user) => {
  if (!data.uids) {
    await db
      .collection(data.index)
      .doc(data.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          user.icon = doc.data().icon;
          user.cover = doc.data().cover;

          if (data.index === "companys") {
            if (
              doc.data().type !== "individual" &&
              doc.data().payment.status === "canceled"
            ) {
              throw new functions.https.HttpsError(
                "not-found",
                "ユーザーの取得に失敗しました",
                "firebase"
              );
            }

            user.type = doc.data().type;
          }

          if (data.index === "persons") {
            const request =
              doc.data().requests?.enable?.indexOf(context.auth.uid) >= 0
                ? "enable"
                : doc.data().requests?.hold?.indexOf(context.auth.uid) >= 0
                ? "hold"
                : doc.data().requests?.disable?.indexOf(context.auth.uid) >= 0
                ? "hold"
                : "none";

            if (request !== "enable") {
              user.profile.name = dummy("person");
              user.profile.email = dummy("email");
              user.profile.urls = dummy("urls", 3);

              user.resume = null;
            } else {
              user.resume = doc.data().resume.url;
            }

            user.request = request;
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
  } else {
    for (let i = 0; i < user.length; i++) {
      user[i] &&
        (await db
          .collection(data.index)
          .doc(user[i].uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              user[i].icon = doc.data().icon;
              user[i].cover = doc.data().cover;
              user[i].type = doc.data().type;
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
};

const fetchBests = async (user, data) => {
  const index = algolia.initIndex(data.index);

  const bests = await index
    .search("", {
      queryLanguages: ["ja", "en"],
      similarQuery: user?.handles?.join(" "),
      filters: "status:enable",
      hitsPerPage: 100,
    })

    .then(({ hits }) => {
      return hits.map(
        (hit) =>
          hit.objectID !== user.uid && fetch.persons({ hit: hit, bests: true })
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
        .collection(data.index)
        .doc(bests[i].uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            if (doc.data().profile.nickName) {
              bests[i].icon = doc.data().icon;
            } else {
              bests[i] = false;
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

  return bests;
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.ses_hub.uid;
};
