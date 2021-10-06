const functions = require("firebase-functions");

const sgMail = require("@sendgrid/mail").setApiKey(
  functions.config().sendgrid.apikey
);

exports.freelanceDirect = async (data) => {
  if (typeof data.to === "string") {
    await sgMail.send(data).catch((e) => {});
  } else {
    const num = 1000;
    const page = Math.ceil(data.to.length / num);

    for (let i = 0; i < page; i++) {
      const multiData = { ...data };
      multiData.to = data.to.slice(i * num, num * (i + 1));

      await sgMail.sendMultiple(multiData).catch((e) => {});
    }
  }
};

exports.seshub = async (data) => {
  if (typeof data.to === "string") {
    await sgMail.send(data);
  } else {
    const num = 1000;
    const page = Math.ceil(data.to.length / num);

    for (let i = 0; i < page; i++) {
      const multiData = { ...data };
      multiData.to = data.to.slice(i * num, num * (i + 1));

      await sgMail.sendMultiple(multiData).catch((e) => {});
    }
  }
};
