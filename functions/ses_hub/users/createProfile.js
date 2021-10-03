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

    const index = algolia.initIndex("companys");
    const user = {
      uid: context.auth.uid,
      icon: `icon${icon}`,
      cover: `cover${cover}`,
      provider: [data.provider],
      profile: {
        name: data.name,
        person: data.person,
        position: data.position,
        body: "",
        postal: data.postal,
        address: data.address,
        email: context.auth.token.email,
        tel: data.tel,
        more: [],
        region: [],
        url: "",
        social: { twitter: "", instagram: "", line: "", linkedIn: "" },
      },
      posts: { matters: [], resources: [] },
      entries: { matters: [], resources: [], persons: [] },
      likes: { matters: [], resources: [], persons: [] },
      outputs: { matters: [], resources: [] },
      follows: [],
      agree: data.agree,
      status: "hold",
      payment: {
        status: "canceled",
        trial: true,
        notice: true,
      },
      createAt: context.auth.token.auth_time * 1000,
    };

    await db
      .collection("companys")
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
              posts: user.posts,
              entries: user.entries,
              likes: user.likes,
              outputs: user.outputs,
              follows: user.follows,
              agree: user.agree,
              payment: user.payment,
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
          person: user.profile.person,
          position: user.profile.position,
          postal: user.profile.postal,
          address: user.profile.address,
          tel: user.profile.tel,
          email: user.profile.email,
          more: user.profile.more,
          region: user.profile.region,
          social: user.profile.social,
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
