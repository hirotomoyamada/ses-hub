const functions = require("firebase-functions");
const db = require("../../firebase").db;
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.updateUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    for await (const user of data) {
      await updateFirestore(user);
      await updateAlgolia(user);
    }

    return data;
  });

const updateFirestore = async (user) => {
  await db
    .collection("companys")
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        doc.ref
          .set(
            user.option
              ? {
                  payment: {
                    status: user.status,
                    option: {
                      freelanceDirect: user.option === "enable" ? true : false,
                    },
                  },
                }
              : {
                  payment: {
                    status: user.status,
                  },
                },
            {
              merge: true,
            }
          )
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
};

const updateAlgolia = async (user) => {
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject(
      user.option
        ? {
            objectID: user.uid,
            plan: user.status !== "canceled" ? "enable" : "disable",
            freelanceDirect: user.option,
          }
        : {
            objectID: user.uid,
            plan: user.status !== "canceled" ? "enable" : "disable",
          },
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
