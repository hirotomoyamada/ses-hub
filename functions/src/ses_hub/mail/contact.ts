import * as functions from "firebase-functions";
import { location, runtime } from "../../firebase";
import { send } from "../../sendgrid";
import * as body from "./_promotion";

export type Data = {
  company: string;
  person: string;
  position: string;
  email: string;
  body: string;
};

export const contactPromotion = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data) => {
    const url: string = functions.config().app.ses_hub.url;

    const adminMail = {
      to: functions.config().admin.ses_hub as string,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: `【お問い合わせ】${data.company} ${data.person}様より`,
      text: body.admin(data),
    };

    const userMail = {
      to: data.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB お問い合わせありがとうございます",
      text: body.user(data, url),
    };

    await send(adminMail);
    await send(userMail);
  });
