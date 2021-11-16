const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../sendgrid").send;
const body = require("../mail/body/users/create");

exports.createUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onCreate(async (snapshot, context) => {
    const child = snapshot.data().type === "child";
    const profile = snapshot.data().profile;

    const url = functions.config().app.ses_hub.url;
    const adminUrl = functions.config().admin.url;

    if (child) {
      throw new functions.https.HttpsError(
        "cancelled",
        "子アカウントのため、処理中止",
        "firebase"
      );
    }

    const adminMail = {
      to: functions.config().admin.ses_hub,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "【承認】承認待ちメンバー",
      text: body.admin(profile, adminUrl),
    };

    const userMail = {
      to: snapshot.data().profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 登録確認のお知らせ",
      text: body.user(profile, url),
    };

    await send(adminMail);
    await send(userMail);
  });
