const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../sendgrid").send;
const body = require("../mail/body/users/create");

exports.createUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onCreate(async (snapshot, context) => {
    const profile = snapshot.data().profile;
    const url = functions.config().app.freelance_direct.url;
    const adminUrl = functions.config().admin.url;

    const adminMail = {
      to: functions.config().admin.freelance_direct,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "【承認】承認待ちメンバー",
      text: body.admin(profile, adminUrl),
    };

    const userMail = {
      to: snapshot.data().profile.email,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "Freelance Direct 登録確認のお知らせ",
      text: body.user(profile, url),
    };

    await send(adminMail);
    await send(userMail);
  });
