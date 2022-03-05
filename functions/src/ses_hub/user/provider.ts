import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import { stripe } from "../../stripe";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";

export type Data = {
  provider: string;
  email?: string;
};

export const addProvider = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await addFirestore(context, data);
    data.email && addAlgolia(context, data);
    data.email && addStripe(context, data);

    return;
  });

const addFirestore = async (
  context: functions.https.CallableContext,
  data: Data
): Promise<void> => {
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
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const profile = doc.data()?.profile;
    const provider = doc.data()?.provider;

    await doc.ref
      .set(
        !data.email
          ? { provider: [data.provider], updateAt: timestamp }
          : {
              provider: [data.provider, ...(provider as string[])],
              profile: Object.assign(profile, {
                email: data.email,
              }),
              updateAt: timestamp,
            },
        { merge: true }
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プロバイダーの更新に失敗しました",
          "firebase"
        );
      });
  }
};

const addAlgolia = async (
  context: functions.https.CallableContext,
  data: Data
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const index = algolia.initIndex("companys");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: context.auth.uid,
        email: data.email,
        updateAt: timestamp,
      },
      {
        createIfNotExists: true,
      }
    )
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロバイダーの更新に失敗しました",
        "algolia"
      );
    });
};

const addStripe = async (
  context: functions.https.CallableContext,
  data: Data
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("customers")
    .withConverter(converter<Firestore.Customer>())
    .doc(context.auth.uid)
    .get();
  const stripeId = doc.exists && doc.data()?.stripeId;

  stripeId &&
    (await stripe.customers
      .update(stripeId, {
        email: data.email,
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "メールアドレスの更新に失敗しました",
          "stripe"
        );
      }));
};
