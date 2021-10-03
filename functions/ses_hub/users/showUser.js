const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.showUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
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

        if (doc.data().payment.status === "canceled") {
          if (data.uid !== context.auth.uid) {
            throw new functions.https.HttpsError(
              "cancelled",
              "リミテッドユーザーのため、処理中止",
              "firebase"
            );
          }
        }
      });

    const index = algolia.initIndex(data.type);
    const user = await index
      .getObject(data.uid)
      .then((hit) => {
        return hit && data.type === "companys"
          ? {
              uid: hit.objectID,
              profile: {
                name: hit.name,
                person: hit.person,
                body: hit.body,
                postal: hit.postal,
                address: hit.address,
                tel: hit.tel,
                email: hit.email,
                more: hit.more,
                region: hit.region,
                url: hit.url,
                social: hit.social,
              },
              createAt: hit.createAt,
              updateAt: hit.updateAt,
            }
          : data.type === "persons" && {
              uid: hit.objectID,
              createAt: hit.createAt,
              updateAt: hit.updateAt,
            };
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "プロフィールの取得に失敗しました",
          "algolia"
        );
      });

    await db
      .collection(data.type)
      .doc(data.uid)
      .get()
      .then((doc) => {
        if (data.type === "companys") {
          if (doc.exists) {
            user.icon = doc.data().icon;
            user.cover = doc.data().cover;
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
  });
