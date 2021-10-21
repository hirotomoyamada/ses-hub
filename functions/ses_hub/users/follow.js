const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.addFollow = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
      canceled: true,
    });

    const timestamp = Date.now();
    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const follows = doc.data().follows;
          const home = doc.data().home;

          doc.ref
            .set(
              follows
                ? follows.indexOf(data.uid) < 0 &&
                  home.indexOf(data.uid) < 0 &&
                  home.length < 15
                  ? {
                      follows: [data.uid, ...follows],
                      home: [data.uid, ...home],
                      updateAt: timestamp,
                    }
                  : follows.indexOf(data.uid) < 0 && {
                      follows: [data.uid, ...follows],
                      updateAt: timestamp,
                    }
                : {
                    follows: [data.uid],
                    home: [data.uid],
                    updateAt: timestamp,
                  },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "フォローの追加に失敗しました",
                "firebase"
              );
            });
        }
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    return;
  });

exports.removeFollow = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      data: data,
      context: context,
      demo: true,
      canceled: true,
    });

    const timestamp = Date.now();
    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const follows = doc.data().follows.filter((uid) => uid !== data.uid);
          const home = doc.data().home.filter((uid) => uid !== data.uid);

          doc.ref
            .set(
              {
                follows: [...follows],
                home: [...home],
                updateAt: timestamp,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "フォローの削除に失敗しました",
                "firebase"
              );
            });
        }
      });

    return;
  });
