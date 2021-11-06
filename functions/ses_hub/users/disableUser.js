const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../sendgrid").send;

const body = require("../mail/body/users/disable");

exports.disableUser = functions
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
      subject: "SES_HUB 利用停止のお知らせ",
      text: body.user(profile, url),
    };

    if (beforeStatus === "enable" && afterStatus === "disable") {
      await send(userMail);

      if (change.before.data().posts.matters.length) {
        const index = algolia.initIndex("matters");
        const posts = change.before.data().posts.matters.map((objectID) => ({
          objectID: objectID,
          display: "private",
        }));

        await index.partialUpdateObjects(posts);
      }
      if (change.before.data().posts.resources.length) {
        const index = algolia.initIndex("resources");
        const posts = change.before.data().posts.resources.map((objectID) => ({
          objectID: objectID,
          display: "private",
        }));

        await index.partialUpdateObjects(posts);
      }
    }
  });
