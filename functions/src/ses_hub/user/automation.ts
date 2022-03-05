import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import { send } from "../../sendgrid";
import * as body from "../mail";
import * as Firestore from "../../types/firestore";

export const createUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onCreate(async (snapshot) => {
    const child = snapshot.data().type === "child";
    const profile: Firestore.Company["profile"] = snapshot.data().profile;

    const url: string = functions.config().app.ses_hub.url;
    const adminUrl: string = functions.config().admin.url;

    if (child) {
      throw new functions.https.HttpsError(
        "cancelled",
        "子アカウントのため、処理中止",
        "firebase"
      );
    }

    const adminMail = {
      to: functions.config().admin.ses_hub as string,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "【承認】承認待ちメンバー",
      text: body.create.admin(profile, adminUrl),
    };

    const userMail = {
      to: profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 登録確認のお知らせ",
      text: body.create.user(profile, url),
    };

    await send(adminMail);
    await send(userMail);
  });

export const deleteUser = functions
  .region(location)
  .runWith(runtime)
  .auth.user()
  .onDelete(async (snapshot) => {
    const uid = snapshot.uid;
    const companys = algolia.initIndex("companys");
    const matters = algolia.initIndex("matters");
    const resources = algolia.initIndex("resources");

    const doc = await db
      .collection("companys")
      .withConverter(converter<Firestore.Company>())
      .doc(uid)
      .get();

    if (doc.exists) {
      const posts = doc.data()?.posts;
      const child = doc.data()?.type === "child";
      const parent = doc.data()?.payment.parent;

      await db.collection("companys").doc(uid).delete();
      await db.collection("customers").doc(uid).delete();
      await companys.deleteObject(uid);

      posts?.matters[0] && (await matters.deleteObjects(posts.matters));
      posts?.resources[0] && (await resources.deleteObjects(posts.resources));

      child && parent && (await deleteChild({ child: uid, parent: parent }));
    }

    return;
  });

const deleteChild = async ({
  child,
  parent,
}: {
  child: string;
  parent: string;
}) => {
  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(parent)
    .get();

  if (doc.exists) {
    const payment = doc.data()?.payment;

    if (payment) {
      const children = payment.children?.filter((uid) => uid !== child);

      await doc.ref.set(
        { payment: Object.assign(payment, { children: children }) },
        { merge: true }
      );
    }
  }

  return;
};

export const enableUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onUpdate(async (change) => {
    const profile: Firestore.Company["profile"] = change.after.data().profile;
    const beforeStatus: string = change.before.data().status;
    const afterStatus: string = change.after.data().status;
    const url = `${functions.config().app.ses_hub.url}/login`;

    const userMail = {
      to: profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 承認完了のお知らせ",
      text: body.enable.user(profile, url),
    };

    if (beforeStatus === "hold" && afterStatus === "enable") {
      await send(userMail);
    }
  });

export const declineUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onUpdate(async (change) => {
    const profile: Firestore.Company["profile"] = change.after.data().profile;
    const beforeStatus: string = change.before.data().status;
    const afterStatus: string = change.after.data().status;
    const url: string = functions.config().app.ses_hub.url;

    const userMail = {
      to: profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 承認結果のお知らせ",
      text: body.decline.user(profile, url),
    };

    if (beforeStatus === "hold" && afterStatus === "disable") {
      await send(userMail);
    }
  });

export const disableUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onUpdate(async (change) => {
    const profile: Firestore.Company["profile"] = change.after.data().profile;
    const beforeStatus: string = change.before.data().status;
    const afterStatus: string = change.after.data().status;
    const url: string = functions.config().app.ses_hub.url;

    const userMail = {
      to: change.after.data().profile.email as string,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 利用停止のお知らせ",
      text: body.disable.user(profile, url),
    };

    if (beforeStatus === "enable" && afterStatus === "disable") {
      await send(userMail);

      const posts: {
        matters: string[];
        resources: string[];
      } = change.before.data().posts;

      if (posts.matters.length) {
        const index = algolia.initIndex("matters");
        const matters = posts.matters.map((objectID) => ({
          objectID: objectID,
          display: "private",
        }));

        await index.partialUpdateObjects(matters);
      }

      if (posts.resources.length) {
        const index = algolia.initIndex("resources");
        const resources = posts.resources.map((objectID) => ({
          objectID: objectID,
          display: "private",
        }));

        await index.partialUpdateObjects(resources);
      }
    }
  });

export const goBackUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("companys/{uid}")
  .onUpdate(async (change) => {
    const profile: Firestore.Company["profile"] = change.after.data().profile;
    const beforeStatus: string = change.before.data().status;
    const afterStatus: string = change.after.data().status;
    const url = `${functions.config().app.ses_hub.url}/login`;

    const userMail = {
      to: profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 利用再開のお知らせ",
      text: body.goBack.user(profile, url),
    };

    if (beforeStatus === "disable" && afterStatus === "enable") {
      await send(userMail);
    }
  });
