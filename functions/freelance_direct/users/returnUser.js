const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
<<<<<<< HEAD
const send = require("../../sendgrid");
=======
const send = require("../../sendgrid").send;
>>>>>>> dev

const body = require("../mail/body/users/return");

exports.returnUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onUpdate(async (change, context) => {
    const profile = change.after.data().profile;
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;
    const url = `${functions.config().app.freelance_direct.url}/login`;

    const userMail = {
      to: change.after.data().profile.email,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "Freelance Direct 利用再開のお知らせ",
      text: body.user(profile, url),
    };

    if (beforeStatus === "disable" && afterStatus === "enable") {
      await send(userMail);
    }
  });
