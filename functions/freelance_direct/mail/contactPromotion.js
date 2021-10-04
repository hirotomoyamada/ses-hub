const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const send = require("../../send-grid");

const body = require("./body/promotion");

exports.contactPromotion = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const url = "https://freelance-direct.app/";

    const adminMail = {
      to: functions.config().admin.freelance_direct,
      message: {
        subject: `【お問い合わせ】${data.company} ${data.person}様より`,
        text: body.admin(data),
      },
    };

    const userMail = {
      to: data.email,
      message: {
        subject: "Freelance Direct お問い合わせありがとうございます",
        text: body.user(data, url),
      },
    };

    await send.freelanceDirect(adminMail);
    await send.freelanceDirect(userMail);
  });
