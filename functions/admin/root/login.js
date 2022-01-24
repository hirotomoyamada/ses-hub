const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

exports.login = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    const auth = await fetchCollection(context);

    return auth;
  });

const fetchCollection = async (context) => {
  const auth = {
    uid: context.auth.uid,
    seshub: {},
    freelanceDirect: {},
  };

  for await (const index of Object.keys(auth)) {
    if (index !== "uid") {
      await db
        .collection(index)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            auth[index][doc.id] = doc.data();
          });
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "データの取得に失敗しました",
            "firebase"
          );
        });
    }
  }

  return auth;
};
