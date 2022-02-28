const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../sendgrid").send;
const tweet = require("../../twitter").tweet;
const shortUrl = require("../../bitly").shortUrl;

const postAuthenticated =
  require("./functions/postAuthenticated").postAuthenticated;
const body = require("../mail/body/posts/create");
const tweetStatus = require("../mail/body/posts/tweet");

exports.sendPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await postAuthenticated({
      context: context,
      canceled: true,
    });

    const post = data.post;

    if (post.display === "private") {
      throw new functions.https.HttpsError(
        "cancelled",
        "非公開の投稿のため、処理中止",
        "sendGrid"
      );
    }

    for await (const index of ["companys", "persons"]) {
      if (index === "persons" && data.index === "resources") {
        continue;
      }

      await sendMail(index, data, post);
      await sendTweet(index, data, post);
    }

    return;
  });

const sendMail = async (index, data, post) => {
  const to = await fetchTo(index, post);

  const user = await fetchUser(post);

  const url =
    index === "companys"
      ? `${functions.config().app.ses_hub.url}/${data.index}/${post.objectID}`
      : `${functions.config().app.freelance_direct.url}/post/${post.objectID}`;

  const subject =
    data.index === "matters"
      ? `【新着案件】 ${post.title}`
      : `【新着人材】 ${post.roman.firstName.substring(
          0,
          1
        )} . ${post.roman.lastName.substring(0, 1)}`;

  const text =
    data.index === "matters"
      ? body.matters(post, user, url)
      : body.resources(post, user, url);

  const mail = {
    to: to,
    from:
      index === "companys"
        ? `SES_HUB <${functions.config().admin.ses_hub}>`
        : `Freelance Direct <${functions.config().admin.freelance_direct}>`,
    subject: subject,
    text: text,
  };

  await send(mail);
};

const sendTweet = async (index, data, post) => {
  const url = await shortUrl(
    index === "companys"
      ? `${functions.config().app.ses_hub.url}/${data.index}/${post.objectID}`
      : `${functions.config().app.freelance_direct.url}/post/${post.objectID}`
  );

  const txt =
    data.index === "matters"
      ? tweetStatus.matters(post, url)
      : tweetStatus.resources(post, url);

  index === "companys"
    ? await tweet.seshub(txt)
    : await tweet.freelanceDirect(txt);
};

const fetchUser = async (post) => {
  const doc = await db.collection("companys").doc(post.uid).get();

  return {
    name: doc.data().profile.name,
    person: doc.data().profile.person,
  };
};

const fetchTo = async (index, post) => {
  const querySnapshot = await db
    .collection(index)
    .where("status", "==", "enable")
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  const to = querySnapshot?.docs
    ?.map((doc) => verified(doc, post) && doc.data().profile.email)
    ?.filter((email) => email);

  return to;
};

const verified = (doc, post) => {
  const id = doc.id;
  const email = doc.data().profile.email;
  const config = functions.config();

  return (
    post.uid !== id &&
    config.admin.ses_hub !== email &&
    config.admin.freelance_direct !== email &&
    config.demo.ses_hub.email !== email &&
    config.demo.freelance_direct.email !== email &&
    true
  );
};
