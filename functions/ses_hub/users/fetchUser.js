const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

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
  const index = algolia.initIndex(data.index);

  const user = await index
    .getObject(data.uid)
    .then((hit) => {
      return hit && data.index === "companys"
        ? fetch.companys({ hit: hit, demo: demo })
        : data.index === "persons" && fetch.persons({ hit: hit, demo: demo });
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "プロフィールの取得に失敗しました",
        "algolia"
      );
    });

  await db
    .collection(data.index)
    .doc(data.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        user.icon = doc.data().icon;
        user.cover = doc.data().cover;

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
            user.profile.name = createDummy("name");
            user.profile.email = createDummy("email");
            user.profile.urls = createDummy("urls", 3);
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

  return user;
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

const createDummy = (d, i) => {
  const dummy =
    d === "name"
      ? ["貞子", "幽明異境", "脇見厳禁", "呪呪呪", "八大地獄", "奇奇怪怪"]
      : d === "email"
      ? [
          "miseruwakeganai@gmail.com",
          "dameyo-damedame@dame.co.jp",
          "watasi-ha-yamada@yamada.com",
          "tousen-omedetougozaimasu@tousen.mail",
          "oreoreoreoreore-sagi@gmail.com",
        ]
      : d === "urls" && [
          "https://dummy.com",
          "https://zettai-misenasen.co.jp",
          "https://mireru-wakega-nai.net",
          "https://sadako.github.io/portfolio",
          "https://sonnani_mitaino.net",
          "https://koreo-mitara-sinu.me",
          "https://dame_zettai.com",
        ];

  if (!i) {
    return dummy[Math.floor(Math.random() * dummy.length)];
  } else {
    return [...Array(Math.floor(Math.random() * i + 1))].map(
      () =>
        [...dummy].splice(Math.floor(Math.random() * [...dummy].length), 1)[0]
    );
  }
};
