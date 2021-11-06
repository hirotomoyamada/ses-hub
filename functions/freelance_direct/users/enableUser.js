const functions = require("firebase-functions");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
<<<<<<< HEAD
const send = require("../../sendgrid");
=======
const send = require("../../sendgrid").send;
>>>>>>> dev

const body = require("../mail/body/users/enable");

exports.enableUser = functions
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
      subject: "Freelance Direct 承認完了のお知らせ",
      text: body.user(profile, url),
    };

    if (beforeStatus === "hold" && afterStatus === "enable") {
      await send(userMail);
    }
  });
