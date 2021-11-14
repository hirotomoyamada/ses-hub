const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const fetch = require("../fetch/fetch");

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
      .then(async (doc) => {
        if (doc.exists) {
          return await organize({ data: data, user: doc.data() })
            .then(async (lists) => {
              const parent =
                doc.data().type === "child"
                  ? await fetchParent(doc.data().payment?.parent)
                  : null;

              return data.index === "companys"
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
            })
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "ユーザーの編集に失敗しました",
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

    return user;
  });

const fetchParent = async (uid) => {
  const parent = await db
    .collection("companys")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return fetch.companys({
          index: "companys",
          doc: doc,
        });
      }
    });

  return parent;
};
