const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../sendgrid").send;
// const twitter = require("../../twitter");

const postAuthenticated =
  require("./functions/postAuthenticated").postAuthenticated;
const body = require("../mail/body/posts/create");

exports.sendPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await postAuthenticated({
      context: context,
      canceled: true,
    });

    if (data.post.display === "private") {
      throw new functions.https.HttpsError(
        "cancelled",
        "非公開の投稿のため、処理中止",
        "sendGrid"
      );
    }

    const {
      mail, // SendGrid
      // text // Twitter
    } = await createMail(data.index, data.post);

    // Twitter 投稿
    // await twitter.tweet(text);

    // SendGrid メール
    await send(mail);

    return;
  });

const fetchUser = async (post) => {
  const user = await db
    .collection("companys")
    .doc(post.uid)
    .get()
    .then((doc) => {
      return {
        name: doc.data().profile.name,
        person: doc.data().profile.person,
      };
    });

  return user;
};

const fetchTo = async (post) => {
  const verified = (doc) => {
    const id = doc.id;
    const email = doc.data().profile.email;
    const config = functions.config();

    return (
      post.uid !== id &&
      config.admin.ses_hub !== email &&
      config.demo.ses_hub.email !== email &&
      true
    );
  };

  const to = await db
    .collection("companys")
    .where("status", "==", "enable")
    .get()
    .then((querySnapshot) => {
      // 本番コード
      const emails = querySnapshot.docs.map(
        (doc) => verified(doc) && doc.data().profile.email
      );

      return emails.filter((email) => email);
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return to;
};

const createMail = async (index, post) => {
  const to = await fetchTo(post);
  const user = await fetchUser(post);

  const subject =
    index === "matters"
      ? `【新着案件】 ${post.title}`
      : index === "resources" &&
        `【新着人材】 ${post.roman.firstName.substring(
          0,
          1
        )} . ${post.roman.lastName.substring(0, 1)}`;

  const url = `${functions.config().app.ses_hub.url}/${index}/${post.objectID}`;

  const text =
    index === "matters"
      ? body.matters(post, user, url)
      : index === "resources" && body.resources(post, user, url);

  const mail = {
    to: to,
    from: `SES_HUB <${functions.config().admin.ses_hub}>`,
    subject: subject,
    text: text,
  };

  return { mail, text };
};
