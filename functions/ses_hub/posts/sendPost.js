const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const postAuthenticated =
  require("./functions/postAuthenticated").postAuthenticated;
const body = require("../mail/body/posts/create");
const send = require("../../send-grid");

exports.sendPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await postAuthenticated({
      context: context,
      uid: data.post.uid,
      canceled: true,
    });

    const index = data.index;
    const post = data.post;

    if (post.display === "private") {
      throw new functions.https.HttpsError(
        "cancelled",
        "非公開の投稿のため、処理中止",
        "sendGrid"
      );
    }

    const to = await db
      .collection("companys")
      .where("status", "==", "enable")
      .get()
      .then((querySnapshot) => {
        // 本番コード
        const emails = querySnapshot.docs.map(
          (doc) => post.uid !== doc.id && doc.data().profile.email
        );

        // テストコード
        //   const emails = querySnapshot.docs.map((doc) => {
        //     const email = doc.data().profile.email;
        //     const name = email.substring(0, email.indexOf("@"));
        //     const dummy = name.concat("@sink.sendgrid.net");
        //     return post.uid !== doc.id && dummy;
        //   });

        return emails.filter((email) => email);
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    // テストコード
    // let to = [];

    // for (let i = 0; i <　1111; i++) {
    //   const name = ["yamada", "ito", "sato", "kato", "suzuki"][
    //     Math.floor(Math.random() * 5)
    //   ];
    //   const sub = Math.random().toString(32).substring(2);
    //   const domain = "@sink.sendgrid.net";
    //   const email = name.concat(sub, domain);

    //   to = [email, ...to];
    // }

    const subject =
      index === "matters"
        ? `【新着案件】 ${post.title}`
        : index === "resources" &&
          `【新着人材】 ${post.roman.firstName.substring(
            0,
            1
          )} . ${post.roman.lastName.substring(0, 1)}`;

    const url = `https://ses-hub.app/${index}/${post.objectID}`;

    const mail = {
      to: to,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: subject,
      text:
        index === "matters"
          ? body.matters(post, url)
          : index === "resources" && body.resources(post, url),
    };

    await send.seshub(mail).catch((e) => {
      throw new functions.https.HttpsError(
        "unavailable",
        "メールの送信に失敗しました",
        "sendGrid"
      );
    });

    return;
  });
