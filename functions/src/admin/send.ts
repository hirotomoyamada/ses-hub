import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import { send } from "../sendgrid";
import * as Firestore from "../types/firestore";

type Data = {
  index: "companys" | "persons";
  title: string;
  body: string;
  target: string | null;
  updateAt?: number;
};

export const sendMail = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);

    const mail = await createMail(data);

    await updateFirestore(data);
    await send(mail);

    return data;
  });

const createMail = async (
  data: Data
): Promise<{
  to: string[];
  from: string;
  subject: string;
  text: string;
}> => {
  const to = await fetchTo(data);
  const from =
    data.index === "companys"
      ? `SES_HUB <${functions.config().admin.ses_hub}>`
      : `Freelance Direct <${functions.config().admin.freelance_direct}>`;

  const title = data.title;
  const body = data.body;

  return {
    to: to,
    from: from,
    subject: title,
    text: body,
  };
};

const fetchTo = async (data: Data): Promise<string[]> => {
  if (data.index === "companys") {
    const querySnapshot = await db
      .collection(data.index)
      .withConverter(converter<Firestore.Company>())
      .where("status", "==", "enable")
      .where(
        "payment.status",
        data.target !== "all" ? "==" : "in",
        data.target !== "all" ? data.target : ["active", "canceled", "trialing"]
      )
      .get();

    const to = querySnapshot.docs
      .map(
        (doc) => verified(doc.data().profile.email) && doc.data().profile.email
      )
      ?.filter((to) => to) as string[];

    return to;
  } else {
    const querySnapshot = await db
      .collection(data.index)
      .withConverter(converter<Firestore.Person>())
      .where("status", "==", "enable")
      .get();

    const to = querySnapshot.docs
      .map(
        (doc) => verified(doc.data().profile.email) && doc.data().profile.email
      )
      ?.filter((to) => to) as string[];

    return to;
  }
};

const updateFirestore = async (data: Data): Promise<void> => {
  const doc = await db
    .collection(
      data.index === "companys"
        ? "seshub"
        : data.index === "persons"
        ? "freelanceDirect"
        : ""
    )
    .doc("mail")
    .get();

  if (doc.exists) {
    data.updateAt = Date.now();

    await doc.ref.set(data, { merge: true }).catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "データの更新に失敗しました",
        "firebase"
      );
    });
  }

  return;
};

const verified = (email: string): boolean => {
  const config = functions.config();

  return (
    config.admin.ses_hub !== email &&
    config.admin.freelance_direct !== email &&
    config.demo.ses_hub.email !== email &&
    config.demo.freelance_direct.email !== email &&
    true
  );
};
