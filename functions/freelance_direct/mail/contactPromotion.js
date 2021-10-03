const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const admin = require("./body/promotion").admin;
const user = require("./body/promotion").user;

exports.contactPromotion = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const url = "https://freelance-direct.app/";

    const adminMail = {
      to: functions.config().admin.freelance_direct_email,
      message: {
        subject: `【お問い合わせ - Freelance Direct】${data.company} ${data.person}様より`,
        text: admin(data),
      },
    };

    const userMail = {
      to: data.email,
      message: {
        subject: "Freelance Direct お問い合わせありがとうございます",
        text: user(data, url),
      },
    };

    await db.collection("mail").add(adminMail);
    await db.collection("mail").add(userMail);
  });
