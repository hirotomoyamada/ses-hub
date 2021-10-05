const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const fetch = require("./fetch/fetch");

const organize = require("./functions/organize").organize;

exports.fetchUser = functions
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

    const user = await db
      .collection(data.index)
      .doc(data.uid)
      .get()
      .then((doc) => {
        return doc.exists && data.index === "companys"
          ? fetch.companys({ index: data.index, doc: doc })
          : doc.exists &&
              data.index === "persons" &&
              fetch.persons({ index: data.index, doc: doc });
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    organize({ index: data.index, uid: data.uid, user: user });

    return user;
  });
