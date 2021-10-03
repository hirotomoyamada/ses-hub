const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const user = require("../mail/body/enable").user;

exports.enableUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onUpdate(async (change, context) => {
    const profile = change.after.data().profile;
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;
    const url = "https://freelance-direct.app/login";

    const userMail = {
      to: change.after.data().profile.email,
      message: {
        subject: "Freelance Direct 承認完了のお知らせ",
        text: user(profile, url),
      },
    };

    if (beforeStatus === "hold" && afterStatus === "enable") {
      await db.collection("mail").add(userMail);
    }
  });
