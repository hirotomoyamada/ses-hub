import * as functions from "firebase-functions";
import { db, location, runtime, converter } from "../../firebase";
import * as Firestore from "../../types/firestore";
import { send } from "../../sendgrid";
import * as body from "../mail";
import { userAuthenticated } from "./_userAuthenticated";

export const enableRequest = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateUser({ context: context, data: data, enable: true });

    return;
  });

export const disableRequest = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateUser({ context: context, data: data });

    return;
  });

const sendMail = async (
  context: functions.https.CallableContext,
  data: string,
  nickName: string
): Promise<void> => {
  const user = await fetchUser(data);

  const url = `${functions.config().app.ses_hub.url}/persons/${
    context.auth?.uid
  }`;

  const mail = {
    to: user.profile.email,
    from: `SES_HUB <${functions.config().admin.ses_hub}>`,
    subject: `【リクエスト】${nickName}さんが承認しました`,
    text: body.request.user({
      user: user.profile,
      nickName: nickName,
      url: url,
    }),
  };

  await send(mail);
};

const fetchUser = async (uid: string): Promise<Firestore.Company> => {
  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (
    doc.data()?.payment.status === "canceled" ||
    !doc.data()?.payment.option?.freelanceDirect
  ) {
    throw new functions.https.HttpsError(
      "cancelled",
      "オプション未加入のユーザーのため、処理中止",
      "firebase"
    );
  }

  const user = doc.data();

  if (!user) {
    throw new functions.https.HttpsError(
      "not-found",
      "ユーザーの取得に失敗しました",
      "firebase"
    );
  }

  return user;
};

const updateDoc = async ({
  context,
  doc,
  data,
  enable,
}: {
  context: functions.https.CallableContext;
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Person>;
  data: string;
  enable?: boolean;
}): Promise<void> => {
  const timestamp = Date.now();

  const nickName = doc.data()?.profile.nickName;
  const requests = doc.data()?.requests;

  if (!requests || !nickName) {
    throw new functions.https.HttpsError(
      "not-found",
      "ユーザーの取得に失敗しました",
      "firebase"
    );
  }

  const disable = requests.disable.indexOf(data) < 0;

  if (
    (enable && requests.enable.indexOf(data) >= 0) ||
    (!enable && requests.disable.indexOf(data) >= 0)
  ) {
    throw new functions.https.HttpsError(
      "cancelled",
      "データが重複しているため、追加できません",
      "firebase"
    );
  }

  await doc.ref
    .set(
      {
        requests: enable
          ? {
              enable: [data, ...requests.enable],
              hold: requests.hold.filter((uid) => uid !== data),
              disable: requests.disable.filter((uid) => uid !== data),
            }
          : {
              enable: requests.enable.filter((uid) => uid !== data),
              hold: requests.hold?.filter((uid) => uid !== data),
              disable: [data, ...requests.disable],
            },
        updateAt: timestamp,
      },
      { merge: true }
    )
    .then(async () => {
      enable && disable && (await sendMail(context, data, nickName));
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "リクエストの追加に失敗しました",
        "firebase"
      );
    });
};

const updateUser = async ({
  context,
  data,
  enable,
}: {
  context: functions.https.CallableContext;
  data: string;
  enable?: boolean;
}): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("persons")
    .withConverter(converter<Firestore.Person>())
    .doc(context.auth.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "データの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    await updateDoc({
      context: context,
      doc: doc,
      data: data,
      enable: enable,
    });
  }

  return;
};
