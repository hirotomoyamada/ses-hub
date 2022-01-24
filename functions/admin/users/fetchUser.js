const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;
const organize = require("../functions/organize").organize;

const fetch = require("../fetch/fetch");

exports.fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    const user = await fetchFirestore(data);

    return user;
  });

const fetchFirestore = async (data) => {
  const doc = await db
    .collection(data.index)
    .doc(data.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const parent =
      doc.data().type === "child"
        ? await fetchParent(doc.data().payment?.parent)
        : null;

    const lists = await organize({ data: data, user: doc.data() }).catch(
      (e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "ユーザーの編集に失敗しました",
          "firebase"
        );
      }
    );

    const user =
      data.index === "companys"
        ? fetch.companys({
            index: data.index,
            doc: doc,
            lists: lists,
            parent: parent,
          })
        : fetch.persons({
            index: data.index,
            doc: doc,
            lists: lists,
          });

    return user;
  }
};

const fetchParent = async (uid) => {
  const doc = await db.collection("companys").doc(uid).get();

  const parent =
    doc.exists &&
    fetch.companys({
      index: "companys",
      doc: doc,
    });

  return parent;
};
