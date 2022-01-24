const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const send = require("../../sendgrid").send;

exports.sendMail = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    const mail = await createMail(data);

    await updateFirestore(data);
    await send(mail);

    return data;
  });

const createMail = async (data) => {
  const to = await fetchTo(data);
  const from =
    data.index === "companys"
      ? `SES_HUB <${functions.config().admin.ses_hub}>`
      : data.index === "persons" &&
        `Freelance Direct <${functions.config().admin.freelance_direct}>`;

  const title = data.title;
  const body = data.body;

  return {
    to: to,
    from: from,
    subject: title,
    text: body,
  };
};

const fetchTo = async (data) => {
  const querySnapshot =
    data.index === "companys"
      ? await db
          .collection(data.index)
          .where("status", "==", "enable")
          .where(
            "payment.status",
            data.target !== "all" ? "==" : "in",
            data.target !== "all"
              ? data.target
              : ["active", "canceled", "trialing"]
          )
          .get()
      : await db.collection(data.index).where("status", "==", "enable").get();

  const to = querySnapshot.docs.map(
    (doc) => verified(doc) && doc.data().profile.email
  );

  return to;
};

const updateFirestore = async (data) => {
  const doc = await db
    .collection(
      data.index === "companys"
        ? "seshub"
        : data.index === "persons" && "freelanceDirect"
    )
    .doc("mail")
    .get();

  if (doc.exists) {
    data.updateAt = Date.now();

    await doc.ref.set(data, { merge: true }).catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "データの更新に失敗しました",
        "firebase"
      );
    });
  }

  return;
};

const verified = (email) => {
  const config = functions.config();

  return (
    config.admin.ses_hub !== email &&
    config.admin.freelance_direct !== email &&
    config.demo.ses_hub.email !== email &&
    config.demo.freelance_direct.email !== email &&
    true
  );
};
