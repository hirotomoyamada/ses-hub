const functions = require("firebase-functions");
const db = require("../../firebase").db;
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.updateUser = functions
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

    for await (const user of data) {
      const children = await updateFirestore(user);
      await updateAlgolia(user);

      if (children?.length) {
        for await (const child of children) {
          await updateFirestore(user, child);
          await updateAlgolia(user, child);
        }
      }
    }

    return data;
  });

const updateFirestore = async (user, child) => {
  const children = await db
    .collection("companys")
    .doc(!child ? user?.uid : child)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        const parent = doc.data().type === "parent";

        await doc.ref
          .set(
            user?.option
              ? {
                  payment:
                    !user?.account || child
                      ? !parent || user?.status !== "canceled"
                        ? {
                            status: user?.status,
                            option: {
                              freelanceDirect:
                                user?.option === "enable" ? true : false,
                            },
                          }
                        : {
                            status: user?.status,
                            option: {
                              freelanceDirect:
                                user?.option === "enable" ? true : false,
                            },
                            account: 0,
                          }
                      : {
                          status: user?.status,
                          option: {
                            freelanceDirect:
                              user?.option === "enable" ? true : false,
                          },
                          account: user?.account,
                        },
                }
              : {
                  payment:
                    !user?.account || child
                      ? !parent || user?.status !== "canceled"
                        ? {
                            status: user?.status,
                          }
                        : {
                            status: user?.status,
                            account: 0,
                          }
                      : {
                          status: user?.status,
                          account: user?.account,
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

        return doc.data().payment?.children;
      }
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return children;
};

const updateAlgolia = async (user, child) => {
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject(
      user.option
        ? {
            objectID: !child ? user?.uid : child,
            plan: user?.status !== "canceled" ? "enable" : "disable",
            freelanceDirect: user?.option,
          }
        : {
            objectID: user?.uid,
            plan: user?.status !== "canceled" ? "enable" : "disable",
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
