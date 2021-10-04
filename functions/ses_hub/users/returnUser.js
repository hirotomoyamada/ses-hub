const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const send = require("../../send-grid");

const body = require("../mail/body/return");

exports.returnUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onUpdate(async (change, context) => {
    const profile = change.after.data().profile;
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;
    const url = "https://ses-hub.app/login";

    const userMail = {
      to: change.after.data().profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 利用再開のお知らせ",
      text: body.user(profile, url),
    };

    if (beforeStatus === "disable" && afterStatus === "enable") {
      await send.seshub(userMail);
    }
  });
