const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const send = require("../../send-grid");

const body = require("./body/promotion/promotion");

exports.contactPromotion = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const url = "https://ses-hub.app/";

    const adminMail = {
      to: functions.config().admin.ses_hub,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: `【お問い合わせ】${data.company} ${data.person}様より`,
      text: body.admin(data),
    };

    const userMail = {
      to: data.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB お問い合わせありがとうございます",
      text: body.user(data, url),
    };

    await send.seshub(adminMail);
    await send.seshub(userMail);
  });
