const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const send = require("../../sendgrid");

const body = require("../mail/body/users/enable");

exports.enableUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onUpdate(async (change, context) => {
    const profile = change.after.data().profile;
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;
    const url = `${functions.config().app.ses_hub.url}/login`;

    const userMail = {
      to: change.after.data().profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 承認完了のお知らせ",
      text: body.user(profile, url),
    };

    if (beforeStatus === "hold" && afterStatus === "enable") {
      await send.seshub(userMail);
    }
  });
