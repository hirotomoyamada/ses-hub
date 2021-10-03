const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const user = require("../mail/body/decline").user;

exports.declineUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onUpdate(async (change, context) => {
    const profile = change.after.data().profile;
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;
    const url = "https://freelance-direct.app";

    const userMail = {
      to: change.after.data().profile.email,
      message: {
        subject: "Freelance Direct 承認結果のお知らせ",
        text: user(profile, url),
      },
    };

    if (beforeStatus === "hold" && afterStatus === "disable") {
      await db.collection("mail").add(userMail);
    }
  });
