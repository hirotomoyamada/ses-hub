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
    await userAuthenticated({ context: context });

    const demo = checkDemo(context);
    const user = await fetchAlgolia(data, demo);
    await fetchFirestore(data, user);

    return user;
  });

const fetchAlgolia = async (data, demo) => {
  const index = algolia.initIndex("companys");

  const hit = await index.getObject(data).catch((e) => {
    throw new functions.https.HttpsError(
      "not-found",
      "プロフィールの取得に失敗しました",
      "algolia"
    );
  });

  const user = hit && fetch.companys({ hit: hit, demo: demo });

  return user;
};

const fetchFirestore = async (data, user) => {
  const doc = await db
    .collection("companys")
    .doc(data)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

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
      user.type = doc.data().type;
    }
  }
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.freelance_direct.uid;
};
