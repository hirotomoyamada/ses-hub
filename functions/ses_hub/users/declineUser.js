const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const send = require("../../sendgrid");

const body = require("../mail/body/users/decline");

exports.declineUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onUpdate(async (change, context) => {
    const profile = change.after.data().profile;
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;
    const url = functions.config().app.ses_hub.url;

    const userMail = {
      to: change.after.data().profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 承認結果のお知らせ",
      text: body.user(profile, url),
    };

    if (beforeStatus === "hold" && afterStatus === "disable") {
      await send(userMail);
    }
  });
