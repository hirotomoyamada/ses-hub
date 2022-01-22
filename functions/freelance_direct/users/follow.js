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
    });

    await updateFirestore({ context: context, data: data, add: true });

    return;
  });

exports.removeFollow = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
    });

    await updateFirestore({ context: context, data: data });

    return;
  });

const updateFirestore = async ({ context, data, add }) => {
  const timestamp = Date.now();

  const doc = await db
    .collection("persons")
    .doc(context.auth.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const follows = add
      ? doc.data().follows
      : doc.data().follows.filter((uid) => uid !== data);

    const home = add
      ? doc.data().home
      : doc.data().home.filter((uid) => uid !== data);

    await doc.ref
      .set(
        add
          ? follows
            ? follows.indexOf(data) < 0 &&
              home.indexOf(data) < 0 &&
              home.length < 15
              ? {
                  follows: [data, ...follows],
                  home: [data, ...home],
                  updateAt: timestamp,
                }
              : follows.indexOf(data.uid) < 0 && {
                  follows: [data, ...follows],
                  updateAt: timestamp,
                }
            : {
                follows: [data],
                home: [data],
                updateAt: timestamp,
              }
          : {
              follows: [...follows],
              home: [...home],
              updateAt: timestamp,
            },
        { merge: true }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          add ? "フォローの追加に失敗しました" : "フォローの削除に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
