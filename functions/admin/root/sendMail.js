const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

const send = require("../../sendgrid").send;

exports.sendMail = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    await updateFirestore(data);

    const mail = await createMail(data);

    await send(mail);

    return data;
  });

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

const fetchTo = async (data) => {
  const to =
    data.index === "companys"
      ? await db
          .collection("companys")
          .where("status", "==", "enable")
          .where(
            "payment.status",
            data.target !== "all" ? "==" : "in",
            data.target !== "all"
              ? data.target
              : ["active", "canceled", "trialing"]
          )
          .get()
          .then((querySnapshot) => {
            // 本番コード
            return querySnapshot.docs.map(
              (doc) => verified(doc) && doc.data().profile.email
            );
          })
      : await db
          .collection("persons")
          .where("status", "==", "enable")
          .get()
          .then((querySnapshot) => {
            // 本番コード
            return querySnapshot.docs.map(
              (doc) => verified(doc) && doc.data().profile.email
            );
          });

  return to;
};

const createMail = async (data) => {
  const to = await fetchTo(data);

  return {
    to: to,
    from:
      data.index === "companys"
        ? `SES_HUB <${functions.config().admin.ses_hub}>`
        : data.index === "persons" &&
          `Freelance Direct <${functions.config().admin.freelance_direct}>`,
    subject: data.title,
    text: data.body,
  };
};

const updateFirestore = async (data) => {
  await db
    .collection(
      data.index === "companys"
        ? "seshub"
        : data.index === "persons" && "freelanceDirect"
    )
    .doc("mail")
    .get()
    .then(async (doc) => {
      data.updateAt = Date.now();

      if (doc.exists) {
        await doc.ref.set(data, { merge: true }).catch((e) => {
          throw new functions.https.HttpsError(
            "data-loss",
            "データの更新に失敗しました",
            "firebase"
          );
        });
      }
    });
};
