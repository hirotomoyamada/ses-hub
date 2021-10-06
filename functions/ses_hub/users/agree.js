const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.enableAgree = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      data: data,
      context: context,
      demo: true,
      agree: true,
    });

    const dataTime = Date.now();

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then(async (doc) => {
        doc.exists &&
          (await doc.ref
            .set(
              {
                agree: "enable",
                updateAt: dataTime,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "プロフィールの更新に失敗しました",
                "firebase"
              );
            }));
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザー全体の取得に失敗しました",
          "firebase"
        );
      });

    return;
  });

exports.disableAgree = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("seshub/agree")
  .onUpdate(async (change, context) => {
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;

    if (beforeStatus === "disable" && afterStatus === "enable") {
      await db
        .collection("companys")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .set(
                {
                  agree: "disable",
                },
                { merge: true }
              )
              .catch((e) => {
                throw new functions.https.HttpsError(
                  "data-loss",
                  "プロフィールの更新に失敗しました",
                  "firebase"
                );
              });
          });
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "not-found",
            "ユーザーの取得に失敗しました",
            "firebase"
          );
        });
      await db
        .collection("seshub")
        .doc("agree")
        .get()
        .then(async (doc) => {
          await doc.ref.set({ status: "disable" }, { merge: true });
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "data-loss",
            "データの更新に失敗しました",
            "firebase"
          );
        });
    }
  });
