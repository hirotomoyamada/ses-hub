import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import { send } from "../../sendgrid";
import * as body from "../mail";
import * as Firestore from "../../types/firestore";

type Data = {
  uid: string;
  body: string;
};

export const addRequest = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
      index: "persons",
    });

    await updatePerson(context, data);

    return;
  });

const sendMail = async (
  context: functions.https.CallableContext,
  user: Firestore.Company,
  selectUser: Firestore.Person,
  data: Data
): Promise<void> => {
  const url = {
    user: `${functions.config().app.ses_hub.url}/persons/${data.uid}`,
    selectUser: `${functions.config().app.freelance_direct.url}/user/${
      context.auth?.uid
    }`,
  };

  const mail = {
    user: {
      to: user.profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "【リクエスト】確認メール",
      text: body.request.user({
        user: user.profile,
        body: data.body,
        url: url.user,
      }),
    },

    selectUser: {
      to: selectUser.profile.email,
      from: `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: `【リクエスト】${user.profile.name} ${user.profile.person}さんから、リクエストがありました`,
      text: body.request.selectUser({
        user: selectUser.profile,
        body: data.body,
        url: url.selectUser,
      }),
    },
  };

  await send(mail.user);
  await send(mail.selectUser);
};

const updateDoc = async ({
  context,
  doc,
  data,
  user,
}: {
  context: functions.https.CallableContext;
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Person | Firestore.Company>;
  data: Data;
  user?: boolean;
}): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  if (!user) {
    const selectUser = doc.data() as Firestore.Person;
    const hold = selectUser.requests.hold;

    await doc.ref
      .set(
        {
          requests: Object.assign(selectUser.requests, {
            hold: [context.auth.uid, ...(hold as string[])],
          }),
        },
        { merge: true }
      )
      .then(async () => {
        await updateUser(context, data, selectUser);
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "リクエストの追加に失敗しました",
          "firebase"
        );
      });
  } else {
    const user = doc.data() as Firestore.Company;
    const entries = user.entries.persons;

    await doc.ref
      .set(
        {
          entries: Object.assign(user.entries, {
            persons: entries
              ? (entries as string[]).indexOf(data.uid) < 0 && [
                  data.uid,
                  ...entries,
                ]
              : [data.uid],
          }),
          updateAt: timestamp,
        },
        { merge: true }
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "エントリーの追加に失敗しました",
          "firebase"
        );
      });
  }
};

const checkDuplicate = (
  context: functions.https.CallableContext,
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Person>
): void => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const enable = doc.data()?.requests?.enable;
  const hold = doc.data()?.requests?.hold;
  const disable = doc.data()?.requests?.disable;

  if (
    (enable as string[]).indexOf(context.auth.uid) >= 0 ||
    (hold as string[]).indexOf(context.auth.uid) >= 0 ||
    (disable as string[]).indexOf(context.auth.uid) >= 0
  ) {
    throw new functions.https.HttpsError(
      "data-loss",
      "すでにリクエスト済みのため、処理中止",
      "firebase"
    );
  }

  return;
};

const updateUser = async (
  context: functions.https.CallableContext,
  data: Data,
  selectUser: Firestore.Person
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(context.auth.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const user = doc.data();

    await sendMail(context, user as Firestore.Company, selectUser, data);

    await updateDoc({ context: context, doc: doc, data: data, user: true });
  }

  return;
};

const updatePerson = async (
  context: functions.https.CallableContext,
  data: Data
): Promise<void> => {
  const doc = await db
    .collection("persons")
    .withConverter(converter<Firestore.Person>())
    .doc(data.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    checkDuplicate(context, doc);

    await updateDoc({ context: context, doc: doc, data: data });
  }

  return;
};
