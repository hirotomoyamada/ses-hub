const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.editProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid === functions.config().demo.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "デモユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.data().status !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "無効なユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().agree !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "利用規約に同意が無いユーザーのため、処理中止",
            "firebase"
          );
        }
      });

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
          "ユーザー全体の取得に失敗しました",
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
