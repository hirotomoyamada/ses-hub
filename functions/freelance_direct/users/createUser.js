const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const admin = require("../mail/body/create").admin;
const user = require("../mail/body/create").user;

exports.createUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onCreate(async (snapshot, context) => {
    const profile = snapshot.data().profile;
    const url = "https://freelance-direct.app/";
    const adminUrl = functions.config().admin.url;

    const adminMail = {
      to: functions.config().admin.freelance_direct_email,
      message: {
        subject: "【承認 - freelance Direct】承認待ちメンバー",
        text: admin(profile, adminUrl),
      },
    };

    const userMail = {
      to: snapshot.data().profile.email,
      message: {
        subject: "Freelance Direct 登録確認のお知らせ",
        text: user(profile, url),
      },
    };

    await db.collection("mail").add(adminMail);
    await db.collection("mail").add(userMail);
  });
