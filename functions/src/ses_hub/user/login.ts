import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import { loginAuthenticated } from "./_loginAuthenticated";
import * as fetch from "./_fetch";
import * as Firestore from "../../types/firestore";

export type Data = {
  providerData: {
    displayName: string;
    email: string;
    phoneNumber: number | null;
    providerId: string;
    uid: string;
  }[];
  emailVerified: boolean;
};

export const login = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await loginAuthenticated({ context: context, data: data });

    const user = await fetchUser(context, data);
    const seshub = await fetchData();
    const demo = checkDemo(context);

    return { user, data: seshub, demo };
  });

const fetchUser = async (
  context: functions.https.CallableContext,
  data: Data
) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(context.auth.uid)
    .get();

  if (doc.exists) {
    await updateAlgolia(context, timestamp);

    if (doc.data()?.provider.length !== data.providerData.length) {
      await updateProvider(doc, data, timestamp);
      await loginAuthenticated({ doc: doc });

      return fetch.login({ context: context, doc: doc, data: data });
    } else {
      await updateLogin(doc, timestamp);
      await loginAuthenticated({ doc: doc });

      return fetch.login({ context: context, doc: doc });
    }
  } else {
    throw new functions.https.HttpsError(
      "not-found",
      "プロフィールが存在しません",
      "profile"
    );
  }
};

const updateLogin = async (
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company>,
  timestamp: number
): Promise<void> => {
  await doc.ref.set(
    {
      lastLogin: timestamp,
    },
    { merge: true }
  );
};

const updateProvider = async (
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company>,
  data: Data,
  timestamp: number
): Promise<void> => {
  await doc.ref
    .set(
      {
        provider: data.providerData.map((provider) => provider.providerId),
        updateAt: timestamp,
        lastLogin: timestamp,
      },
      { merge: true }
    )
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロバイダーの更新に失敗しました",
        "provider"
      );
    });
};

const updateAlgolia = async (
  context: functions.https.CallableContext,
  timestamp: number
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject({
      objectID: context.auth.uid,
      lastLogin: timestamp,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "投稿の編集に失敗しました",
        "algolia"
      );
    });
};

const fetchData = async (): Promise<Firestore.Data> => {
  let data = {} as Firestore.Data;

  const querySnapshot = await db
    .collection("seshub")
    .withConverter(converter<Firestore.Data>())
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "データの取得に失敗しました",
        "firebase"
      );
    });

  querySnapshot?.forEach((doc) => {
    data = { ...data, [doc.id]: doc.data() };
  });

  return data;
};

const checkDemo = (context: functions.https.CallableContext): boolean =>
  context.auth?.uid === functions.config().demo.ses_hub.uid;
