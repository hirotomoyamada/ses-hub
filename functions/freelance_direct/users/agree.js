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
      context: context,
      demo: true,
      agree: true,
    });

    await updateFiresotre({ context: context });

    return;
  });

exports.disableAgree = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("freelanceDirect/agree")
  .onUpdate(async (change, context) => {
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;

    if (beforeStatus === "disable" && afterStatus === "enable") {
      await updateFiresotre({ context: context, everyone: true });
      await updateData();
    }

    return;
  });

const updateFiresotre = async ({ context, everyone }) => {
  const timestamp = Date.now();

  if (!everyone) {
    const doc = await db
      .collection("persons")
      .doc(context.auth.uid)
      .get()
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    if (doc.exists) {
      await doc.ref
        .set(
          {
            agree: "enable",
            updateAt: timestamp,
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
    }
  } else {
    const querySnapshot = await db
      .collection("persons")
      .get()
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    querySnapshot?.forEach(async (doc) => {
      await doc.ref
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
  }

  return;
};

const updateData = async () => {
  const doc = await db
    .collection("freelanceDirect")
    .doc("agree")
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "データの更新に失敗しました",
        "firebase"
      );
    });

  await doc.ref.set({ status: "disable" }, { merge: true });

  return;
};
