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
    await userAuthenticated({ data: data, context: context, demo: true });

    const dataTime = Date.now();

    const index = algolia.initIndex("companys");
    const user = {
      uid: context.auth.uid,
      icon: data.icon,
      cover: data.cover,
      profile: {
        name: data.name,
        person: data.person,
        body: data.body,
        more: data.more ? data.more : [],
        region: data.region ? data.region : [],
        postal: data.postal,
        address: data.address,
        tel: data.tel,
        url: data.url,
        social: data.social,
      },
      updateAt: dataTime,
    };

    await db
      .collection("companys")
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
          name: user.profile.name,
          person: user.profile.person,
          body: user.profile.body,
          more: user.profile.more,
          region: user.profile.region,
          postal: user.profile.postal,
          address: user.profile.address,
          tel: user.profile.tel,
          url: user.profile.url,
          social: user.profile.social,
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
  });
