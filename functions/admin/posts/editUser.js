const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.editUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid !== functions.config().admin.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "無効なユーザーのため、処理中止",
        "firebase"
      );
    }

    const dataTime = Date.now();
    const index = algolia.initIndex(data.index);
    const user =
      data.index === "companys"
        ? {
            uid: data.user.uid,
            icon: data.user.icon,
            cover: data.user.cover,
            status: data.user.status,
            profile: {
              name: data.user.name,
              person: data.user.person,
              body: data.user.body,
              more: data.user.more ? data.user.more : [],
              region: data.user.region ? data.user.region : [],
              postal: data.user.postal,
              address: data.user.address,
              tel: data.user.tel,
              url: data.user.url,
              social: data.user.social,
            },
            updateAt: dataTime,
          }
        : data.index === "persons" && {
            uid: data.user.uid,
            icon: data.user.icon,
            cover: data.user.cover,
            status: data.user.status,
            profile: {
              name: data.user.name,
            },
            updateAt: dataTime,
          };

    await db
      .collection(data.index)
      .doc(data.user.uid)
      .get()
      .then(async (doc) => {
        doc.exists &&
          (await doc.ref
            .set(
              {
                icon: user.icon,
                cover: user.cover,
                status: user.status,
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
        data.index === "companys"
          ? {
              objectID: user.uid,
              status: user.status,
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
            }
          : data.index === "persons" && {
              objectID: user.uid,
              status: user.status,
              name: user.profile.name,
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
  });
