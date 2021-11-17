const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const edit = require("../edit/edit");

exports.editUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    const user =
      data.index === "companys"
        ? edit.companys({ data: data })
        : data.index === "persons" && edit.persons({ data: data });

    await updateFirestore(data, user);
    await updateAlgolia(data, user);
  });

const updateAlgolia = async (data, user) => {
  const index = algolia.initIndex(data.index);

  await index
    .partialUpdateObject(
      data.index === "companys"
        ? edit.companys({ user: user })
        : data.index === "persons" && edit.persons({ user: user }),
      {
        createIfNotExists: true,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ユーザーの編集に失敗しました",
        "algolia"
      );
    });
};

const updateFirestore = async (data, user) => {
  await db
    .collection(data.index)
    .doc(data.user.uid)
    .get()
    .then(async (doc) => {
      doc.exists &&
        (await doc.ref
          .set(
            data.index === "companys"
              ? {
                  type: user.type,
                  icon: user.icon,
                  cover: user.cover,
                  status: user.status,
                  profile: user.profile,
                  updateAt: user.updateAt,
                }
              : {
                  icon: user.icon,
                  cover: user.cover,
                  status: user.status,
                  profile: user.profile,
                  updateAt: user.updateAt,
                },
            { merge: true }
          )
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "ユーザーの編集に失敗しました",
              "firebase"
            );
          }));
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });
};
