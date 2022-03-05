import * as functions from "firebase-functions";
import { converter, db, location, runtime, storage } from "../../firebase";
import { algolia } from "../../algolia";
import { send } from "../../sendgrid";
import * as body from "../mail";
import * as Firestore from "../../types/firestore";

export const createUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onCreate(async (snapshot) => {
    const profile: Firestore.Person["profile"] = snapshot.data().profile;
    const url: string = functions.config().app.freelance_direct.url;
    const adminUrl: string = functions.config().admin.url;

    const adminMail = {
      to: functions.config().admin.freelance_direct as string,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "【承認】承認待ちメンバー",
      text: body.create.admin(profile, adminUrl),
    };

    const userMail = {
      to: profile.email,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "Freelance Direct 登録確認のお知らせ",
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
    const index = algolia.initIndex("persons");

    const doc = await db
      .collection("persons")
      .withConverter(converter<Firestore.Person>())
      .doc(uid)
      .get();

    const key = doc.data()?.resume.key;

    const name = `${key}.pdf`;
    const bucket = storage.bucket(functions.config().storage.resume);
    const path = bucket.file(name);

    await db.collection("persons").doc(uid).delete();

    await index.deleteObject(uid);

    if (key) {
      await path.delete();
    }

    return;
  });

export const enableUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onUpdate(async (change) => {
    const profile: Firestore.Person["profile"] = change.after.data().profile;
    const beforeStatus: string = change.before.data().status;
    const afterStatus: string = change.after.data().status;
    const url = `${functions.config().app.freelance_direct.url}/login`;

    const userMail = {
      to: change.after.data().profile.email,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "Freelance Direct 承認完了のお知らせ",
      text: body.enable.user(profile, url),
    };

    if (beforeStatus === "hold" && afterStatus === "enable") {
      await send(userMail);
    }
  });

export const declineUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onUpdate(async (change) => {
    const profile: Firestore.Person["profile"] = change.after.data().profile;
    const beforeStatus: string = change.before.data().status;
    const afterStatus: string = change.after.data().status;
    const url: string = functions.config().app.freelance_direct.url;

    const userMail = {
      to: profile.email,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "Freelance Direct 承認結果のお知らせ",
      text: body.decline.user(profile, url),
    };

    if (beforeStatus === "hold" && afterStatus === "disable") {
      await send(userMail);
    }
  });

export const disableUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onUpdate(async (change) => {
    const profile: Firestore.Person["profile"] = change.after.data().profile;
    const beforeStatus: string = change.before.data().status;
    const afterStatus: string = change.after.data().status;
    const url: string = functions.config().app.freelance_direct.url;

    const userMail = {
      to: profile.email,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "Freelance Direct 利用停止のお知らせ",
      text: body.disable.user(profile, url),
    };

    if (beforeStatus === "enable" && afterStatus === "disable") {
      await send(userMail);
    }
  });

export const goBackUser = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("persons/{uid}")
  .onUpdate(async (change) => {
    const profile: Firestore.Person["profile"] = change.after.data().profile;
    const beforeStatus: string = change.before.data().status;
    const afterStatus: string = change.after.data().status;
    const url: string = `${functions.config().app.freelance_direct.url}/login`;

    const userMail = {
      to: profile.email,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: "Freelance Direct 利用再開のお知らせ",
      text: body.goBack.user(profile, url),
    };

    if (beforeStatus === "disable" && afterStatus === "enable") {
      await send(userMail);
    }
  });
