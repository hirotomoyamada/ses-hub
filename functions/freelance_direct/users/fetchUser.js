const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context });

    const demo = checkDemo(context);
    const user = await fetchAlgolia(data, demo);
    await fetchFirestore(data, user);

    return user;
  });

const fetchAlgolia = async (data, demo) => {
  const index = algolia.initIndex("companys");

  const user = await index
    .getObject(data)
    .then((hit) => {
      return (
        hit && {
          uid: hit.objectID,
          profile: {
            name: hit.name,
            person: hit.person,
            body: hit.body,
            postal: hit.postal,
            address: hit.address,
            tel: !demo ? hit.tel : null,
            email: !demo ? hit.email : null,
            url: !demo ? hit.url : null,
            social: !demo ? hit.social : {},
          },
          createAt: hit.createAt,
          updateAt: hit.updateAt,
        }
      );
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "プロフィールの取得に失敗しました",
        "algolia"
      );
    });

  return user;
};

const fetchFirestore = async (data, user) => {
  await db
    .collection("companys")
    .doc(data)
    .get()
    .then((doc) => {
      if (doc.exists) {
        if (
          doc.data().payment.status === "canceled" ||
          !doc.data().payment.option?.freelanceDirect
        ) {
          throw new functions.https.HttpsError(
            "cancelled",
            "オプション未加入のユーザーのため、処理中止",
            "firebase"
          );
        } else {
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
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.ses_hub.uid;
};
