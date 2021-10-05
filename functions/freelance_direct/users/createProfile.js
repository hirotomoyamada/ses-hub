const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.createProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const icon = Math.floor(Math.random() * 18);
    const cover = Math.floor(Math.random() * 3);

    const index = algolia.initIndex("persons");
    const user = {
      uid: context.auth.uid,
      icon: `icon${icon}`,
      cover: `cover${cover}`,
      provider: [data.provider],
      profile: {
        name: data.name,
        email: context.auth.token.email,
        age: data.age,
        sex: data.sex,
        position: data.position,
        location: data.location,
        handles: data.handles,

        body: "",
        tools: [],
        skills: [],
        urls: [],
      },
      entries: { matters: [], resources: [] },
      likes: { matters: [], resources: [] },
      follows: [],
      home: [],
      data: [],
      agree: data.agree,
      status: "hold",
      createAt: context.auth.token.auth_time * 1000,
    };

    await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .then(async (doc) => {
        !doc.exists &&
          (await doc.ref
            .set({
              icon: user.icon,
              cover: user.cover,
              provider: user.provider,
              profile: user.profile,
              entries: user.entries,
              likes: user.likes,
              follows: user.follows,
              home: user.home,
              data: user.data,
              agree: user.agree,
              status: user.status,
              createAt: user.createAt,
              lastLogin: user.createAt,
            })
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "プロフィールの作成に失敗しました",
                "firebase"
              );
            }));
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザー全体の取得に失敗しました",
          "firebase"
        );
      });

    await index
      .partialUpdateObject(
        {
          objectID: user.uid,
          uid: user.uid,
          status: user.status,
          name: user.profile.name,
          email: user.profile.email,

          age: user.profile.age,
          sex: user.profile.sex,
          position: user.profile.position,
          location: user.profile.location,
          handles: user.profile.handles,

          body: user.profile.body,
          tools: user.profile.tools,
          skills: user.profile.skills,
          urls: user.profile.urls,

          createAt: user.createAt,
          lastLogin: user.createAt,
        },
        {
          createIfNotExists: true,
        }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プロフィールの作成に失敗しました",
          "algolia"
        );
      });

    return user;
  });
