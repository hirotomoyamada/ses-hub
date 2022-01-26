const functions = require("firebase-functions");
const db = require("../../firebase").db;
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

exports.updateUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

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
  const doc = await db
    .collection("companys")
    .doc(!child ? user?.uid : child)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const parent = doc.data().type === "parent";

    const children = doc.data().payment?.children;

    const status = {
      payment: !parent
        ? {
            status: user?.status,
          }
        : !children
        ? {
            status: user?.status,
            account: !user?.account ? 0 : user?.account,
            children: [],
          }
        : {
            status: user?.status,
            account: !user?.account ? 0 : user?.account,
          },
    };

    const option = {
      payment: !parent
        ? {
            status: user?.status,
            option: {
              freelanceDirect: user?.option === "enable" ? true : false,
            },
          }
        : !children
        ? {
            status: user?.status,
            option: {
              freelanceDirect: user?.option === "enable" ? true : false,
            },
            account: !user?.account ? 0 : user?.account,
            children: [],
          }
        : {
            status: user?.status,
            option: {
              freelanceDirect: user?.option === "enable" ? true : false,
            },
            account: !user?.account ? 0 : user?.account,
          },
    };

    await doc.ref
      .set(!user?.option ? status : option, {
        merge: true,
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "ユーザーの編集に失敗しました",
          "firebase"
        );
      });

    return children;
  }
};

const updateAlgolia = async (user, child) => {
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject(
      // オプションの指定があれば
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
      // オブジェクトがなければ処理中止
      {
        createIfNotExists: false,
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
