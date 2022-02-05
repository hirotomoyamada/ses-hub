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
    const status = await userAuthenticated({
      context: context,
      index: data.index,
      canceled: true,
      fetch: true,
    });

    const demo = checkDemo(context);
    const user = await fetchProfile(context, data, demo, status);
    const bests = data.index === "persons" && (await fetchBests(user, data));

    return { user: user, bests: bests };
  });

const fetchProfile = async (context, data, demo, status) => {
  const user = await fetchAlgolia(data, demo, status);

  await fetchFirestore(context, data, user);

  return user;
};

const fetchAlgolia = async (data, demo, status) => {
  const index = algolia.initIndex(data.index);

  const user = !data.uids
    ? await index
        .getObject(data.uid)
        .then((hit) => {
          return hit && data.index === "companys"
            ? status
              ? fetch.companys({ hit: hit, demo: demo })
              : fetch.companys({ hit: hit, demo: demo, canceled: true })
            : hit &&
                data.index === "persons" &&
                fetch.persons({ hit: hit, demo: demo });
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "プロフィールの取得に失敗しました",
            "notFound"
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
            "notFound"
          );
        });

  return user;
};

const fetchFirestore = async (context, data, user) => {
  if (!data.uids) {
    const doc = await db
      .collection(data.index)
      .doc(data.uid)
      .get()
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "notFound"
        );
      });

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
            "notFound"
          );
        }
        user.payment = { status: doc.data().payment.status };
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
  } else {
    for (let i = 0; i < user.length; i++) {
      if (user[i]) {
        const doc = await db
          .collection(data.index)
          .doc(user[i].uid)
          .get()
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "ユーザーの取得に失敗しました",
              "firebase"
            );
          });

        if (doc.exists) {
          user[i].icon = doc.data().icon;
          user[i].cover = doc.data().cover;
          user[i].type = doc.data().type;
        }
      }
    }
  }
};

const fetchBests = async (user, data) => {
  const index = algolia.initIndex(data.index);

  const { hits } = await index
    .search("", {
      queryLanguages: ["ja", "en"],
      similarQuery: user?.handles?.join(" "),
      filters: "status:enable",
      hitsPerPage: 100,
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  const bests = hits?.map(
    (hit) =>
      hit.objectID !== user.uid && fetch.persons({ hit: hit, bests: true })
  );

  for (let i = 0; i < bests?.length; i++) {
    if (bests[i]) {
      const doc = await db
        .collection(data.index)
        .doc(bests[i].uid)
        .get()
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "ユーザーの取得に失敗しました",
            "firebase"
          );
        });

      if (doc.exists) {
        if (doc.data().profile.nickName) {
          bests[i].icon = doc.data().icon;
        } else {
          bests[i] = false;
        }
      }
    }
  }

  return bests;
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.ses_hub.uid;
};
