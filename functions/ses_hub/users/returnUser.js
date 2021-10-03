const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const user = require("../mail/body/return").user;

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
      message: {
        subject: "SES_HUB 利用再開のお知らせ",
        text: user(profile, url),
      },
    };

    if (beforeStatus === "disable" && afterStatus === "enable") {
      await db.collection("mail").add(userMail);
    }
  });
