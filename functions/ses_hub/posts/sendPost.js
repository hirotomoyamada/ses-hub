const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../sendgrid").send;
// const tweet = require("../../twitter").tweet;

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

    const index = data.index;
    const post = data.post;

    if (post.display === "private") {
      throw new functions.https.HttpsError(
        "cancelled",
        "非公開の投稿のため、処理中止",
        "sendGrid"
      );
    }

    const user = await fetchUser(post);
    const to = await fetchTo(post);
    const mail = createMail(index, post, user, to);

    // await tweet(mail.text);

    await send(mail);

    return;
  });

const createMail = (index, post, user, to) => {
  const url = `${functions.config().app.ses_hub.url}/${index}/${post.objectID}`;

  const subject =
    index === "matters"
      ? `【新着案件】 ${post.title}`
      : index === "resources" &&
        `【新着人材】 ${post.roman.firstName.substring(
          0,
          1
        )} . ${post.roman.lastName.substring(0, 1)}`;

  const text =
    index === "matters"
      ? body.matters(post, user, url)
      : index === "resources" && body.resources(post, user, url);

  return {
    to: to,
    from: `SES_HUB <${functions.config().admin.ses_hub}>`,
    subject: subject,
    text: text,
  };
};

const fetchUser = async (post) => {
  const doc = await db.collection("companys").doc(post.uid).get();

  return {
    name: doc.data().profile.name,
    person: doc.data().profile.person,
  };
};

const fetchTo = async (post) => {
  const querySnapshot = await db
    .collection("companys")
    .where("status", "==", "enable")
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return querySnapshot?.docs
    ?.map((doc) => verified(doc, post) && doc.data().profile.email)
    ?.filter((email) => email);
};

const verified = (doc, post) => {
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
