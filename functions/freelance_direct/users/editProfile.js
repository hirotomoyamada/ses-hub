const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.editProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    if (context.auth.uid === data.uid) {
      const timestamp = Date.now();

      const index = algolia.initIndex("persons");
      const user = {
        uid: context.auth.uid,
        icon: data.icon,
        cover: data.cover,
        profile: {
          nickName: data.nickName,
          body: data.body,
          age: data.age,
          sex: data.sex,
          position: data.position,
          location: data.location,
          period: data.period,

          handles: data.handles,
          tools: data.tools,
          skills: data.skills,
          urls: data.urls,

          resident: data.resident,
          working: data.working,
          clothes: data.clothes,
          costs: data.costs,
        },
        updateAt: timestamp,
      };

      await db
        .collection("persons")
        .doc(context.auth.uid)
        .get()
        .then(async (doc) => {
          doc.exists &&
            (await doc.ref
              .set(
                {
                  icon: user.icon,
                  cover: user.cover,
                  profile: user.profile,
                  updateAt: user.updateAt,
                },
                { merge: true }
              )
              .catch((e) => {
                throw new functions.https.HttpsError(
                  "data-loss",
                  "プロフィールの更新に失敗しました",
                  "firebase"
                );
              }));
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "ユーザーの取得に失敗しました",
            "firebase"
          );
        });

      await index
        .partialUpdateObject(
          {
            objectID: user.uid,
            nickName: user.profile.nickName,
            body: user.profile.body,

            age: user.profile.age,
            sex: user.profile.sex,
            position: user.profile.position,
            location: user.profile.location,
            period: user.profile.period,

            handles: user.profile.handles,
            tools: user.profile.tools,
            skills: user.profile.skills,
            urls: user.profile.urls,

            resident: user.profile.resident,
            working: user.profile.working,
            clothes: user.profile.clothes,
            costs: user.profile.costs,

            updateAt: user.updateAt,
          },
          {
            createIfNotExists: true,
          }
        )
        .catch((e) => {
          throw new functions.https.HttpsError(
            "data-loss",
            "プロフィールの更新に失敗しました",
            "algolia"
          );
        });

      return;
    }
  });
