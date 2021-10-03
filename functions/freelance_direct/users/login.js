const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.login = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const dataTime = Date.now();

    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "認証されていないユーザーではログインできません",
        "auth"
      );
    }

    if (!data.emailVerified) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "メールアドレスが認証されていません",
        "emailVerified"
      );
    }

    const user =
      context.auth &&
      data.emailVerified &&
      (await db
        .collection("persons")
        .doc(context.auth.uid)
        .get()
        .then(async (doc) => {
          const index = algolia.initIndex("persons");

          await index
            .partialUpdateObject({
              objectID: context.auth.uid,
              lastLogin: dataTime,
            })
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "投稿の編集に失敗しました",
                "algolia"
              );
            });

          if (
            doc.exists &&
            doc.data().provider.length !== data.providerData.length
          ) {
            doc.ref
              .set(
                {
                  provider: data.providerData.map(
                    (provider) => provider.providerId
                  ),
                  updateAt: dataTime,
                  lastLogin: dataTime,
                },
                { merge: true }
              )
              .catch((e) => {
                throw new functions.https.HttpsError(
                  "data-loss",
                  "プロバイダーの更新に失敗しました",
                  "provider"
                );
              });

            if (doc.data().status === "hold") {
              throw new functions.https.HttpsError(
                "unavailable",
                "このアカウントは承認されていません",
                "hold"
              );
            }

            if (doc.data().status === "disable") {
              throw new functions.https.HttpsError(
                "unavailable",
                "このアカウントでは利用できません",
                "disable"
              );
            }

            return {
              uid: context.auth.uid,
              icon: doc.data().icon,
              cover: doc.data().cover,
              provider: data.providerData.map(
                (provider) => provider.providerId
              ),
              profile: doc.data().profile,
              agree: doc.data().agree,
              entries: doc.data().entries,
              likes: doc.data().likes,
              follows: doc.data().follows,
              createAt: doc.data().createAt,
              updateAt: doc.data().updateAt,
            };
          } else if (doc.exists) {
            doc.ref.set(
              {
                lastLogin: dataTime,
              },
              { merge: true }
            );

            if (doc.data().status === "hold") {
              throw new functions.https.HttpsError(
                "unavailable",
                "承認されていません",
                "hold"
              );
            }

            if (doc.data().status === "disable") {
              throw new functions.https.HttpsError(
                "unavailable",
                "プロバイダーの更新に失敗しました",
                "disable"
              );
            }

            return {
              uid: context.auth.uid,
              icon: doc.data().icon,
              cover: doc.data().cover,
              provider: doc.data().provider,
              profile: doc.data().profile,
              agree: doc.data().agree,
              entries: doc.data().entries,
              likes: doc.data().likes,
              follows: doc.data().follows,
              createAt: doc.data().createAt,
              updateAt: doc.data().updateAt,
            };
          } else {
            throw new functions.https.HttpsError(
              "not-found",
              "ユーザーのプロフィールが存在しません",
              "profile"
            );
          }
        }));

    const collection = {};

    await db
      .collection("freelanceDirect")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          collection[doc.id] = doc.data();
        });
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "データの取得に失敗しました",
          "firebase"
        );
      });

    const demo =
      context.auth.uid === functions.config().demo.uid ? true : false;

    return { user: user, data: collection, demo: demo };
  });
