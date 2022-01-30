const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../sendgrid").send;
const body = require("../mail/body/application/type");

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.applicationType = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
    });

    const timestamp = Date.now();

    const doc = await db
      .collection("companys")
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
      userVarification(doc);

      await doc.ref
        .set(
          {
            application: true,
            updateAt: timestamp,
          },
          { merge: true }
        )
        .then(async () => {
          const adminUrl = functions.config().admin.url;
          const profile = doc.data().profile;

          const adminMail = {
            to: functions.config().admin.ses_hub,
            from: `SES_HUB <${functions.config().admin.ses_hub}>`,
            subject: "【法人】申請されたメンバー",
            text: body.admin(profile, adminUrl),
          };

          await send(adminMail);
        })
        .catch((e) => {
          throw new functions.https.HttpsError(
            "data-loss",
            "申請の変更に失敗しました",
            "firebase"
          );
        });
    }

    return;
  });

const userVarification = (doc) => {
  if (doc.data().application) {
    throw new functions.https.HttpsError(
      "cancelled",
      "すでに申請済みのため、処理中止",
      "firebase"
    );
  }

  if (doc.data().type !== "individual") {
    throw new functions.https.HttpsError(
      "cancelled",
      "法人アカウントのため、処理中止",
      "firebase"
    );
  }

  if (doc.data().payment?.price) {
    throw new functions.https.HttpsError(
      "cancelled",
      "プランを契約しているため、処理中止",
      "firebase"
    );
  }

  if (doc.data().payment?.children?.length) {
    throw new functions.https.HttpsError(
      "cancelled",
      "グループアカウントを保有しているため、処理中止",
      "firebase"
    );
  }

  if (!doc.data().payment?.price && doc.data().payment?.status !== "canceled") {
    throw new functions.https.HttpsError(
      "cancelled",
      "特殊なアカウントのため、処理中止",
      "firebase"
    );
  }
};
