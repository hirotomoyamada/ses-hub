import * as functions from "firebase-functions";
import * as sgMail from "@sendgrid/mail";

sgMail.setApiKey(functions.config().sendgrid.api_key);

type Data = {
  to: string | string[];
  from: string;
  subject: string;
  text: string;
};

export const send = async (data: Data): Promise<void> => {
  if (typeof data.to === "string") {
    await sgMail.send(data).catch(() => {
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

      await sgMail.sendMultiple(multiData).catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "メールの送信に失敗しました",
          "sendgrid"
        );
      });
    }
  }
};
