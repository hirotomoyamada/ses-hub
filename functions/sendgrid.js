const functions = require("firebase-functions");

const sgMail = require("@sendgrid/mail").setApiKey(
  functions.config().sendgrid.api_key
);

exports.freelanceDirect = async (data) => {
  if (typeof data.to === "string") {
    await sgMail.send(data).catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "メールの送信に失敗しました",
        "sendgrid"
      );
    });
  } else {
    const num = 1000;
    const page = Math.ceil(data.to.length / num);

    for (let i = 0; i < page; i++) {
      const multiData = { ...data };
      multiData.to = data.to.slice(i * num, num * (i + 1));

      await sgMail.sendMultiple(multiData).catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "メールの送信に失敗しました",
          "sendgrid"
        );
      });
    }
  }
};

exports.seshub = async (data) => {
  if (typeof data.to === "string") {
    await sgMail.send(data).catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "メールの送信に失敗しました",
        "sendgrid"
      );
    });
  } else {
    const num = 1000;
    const page = Math.ceil(data.to.length / num);

    for (let i = 0; i < page; i++) {
      const multiData = { ...data };
      multiData.to = data.to.slice(i * num, num * (i + 1));

      await sgMail.sendMultiple(multiData).catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "メールの送信に失敗しました",
          "sendgrid"
        );
      });
    }
  }
};
