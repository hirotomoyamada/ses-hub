const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.addProvider = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid === functions.config().demo.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "デモユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.data().status !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "無効なユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().agree !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "利用規約に同意が無いユーザーのため、処理中止",
            "firebase"
          );
        }
      });

    const dataTime = Date.now();
    const index = algolia.initIndex("companys");

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const provider = doc.data().provider;

          doc.ref
            .set(
              !data.email
                ? { provider: data.provider, updateAt: dataTime }
                : {
                    provider: [data.provider, ...provider],
                    profile: {
                      email: data.email,
                    },
                    updateAt: dataTime,
                  },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "プロバイダーの更新に失敗しました",
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

    data.email &&
      (await index
        .partialUpdateObject(
          {
            objectID: context.auth.uid,
            email: data.email,
            updateAt: dataTime,
          },
          {
            createIfNotExists: true,
          }
        )
        .catch((e) => {
          throw new functions.https.HttpsError(
            "data-loss",
            "プロバイダーの更新に失敗しました",
            "algolia"
          );
        }));

    return;
  });
