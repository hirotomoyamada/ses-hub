const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const admin = require("../mail/body/promotion").admin;
const user = require("../mail/body/promotion").user;

exports.contactPromotion = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const url = "https://ses-hub.app/";

    const adminMail = {
      to: functions.config().admin.ses_hub_email,
      message: {
        subject: `【お問い合わせ - SES_HUB】${data.company} ${data.person}様より`,
        text: admin(data),
      },
    };

    const userMail = {
      to: data.email,
      message: {
        subject: "SES_HUB お問い合わせありがとうございます",
        text: user(data, url),
      },
    };

    await db.collection("mail").add(adminMail);
    await db.collection("mail").add(userMail);
  });
