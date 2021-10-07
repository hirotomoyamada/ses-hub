const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.showUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ data: data, context: context, canceled: true });
    const demo = context.auth.uid === functions.config().demo.uid;

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
                tel: !demo ? hit.tel : null,
                email: !demo ? hit.email : null,
                more: hit.more,
                region: hit.region,
                url: !demo ? hit.url : null,
                social: !demo ? hit.social : {},
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
