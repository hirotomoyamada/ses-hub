import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import { userAuthenticated } from "./_userAuthenticated";
import * as format from "./_format";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";

export type Data = {
  create: {
    type: string;
    name: string;
    person: string;
    position: string | null;
    postal: string;
    address: string;
    tel: string;
    agree: string;
    provider: string;
    fetch: boolean;
  };
  edit: {
    icon: string;
    cover: string;
    name: string;
    person: string;
    body: string | null;
    more: string[];
    region: string[];
    postal: string | null;
    address: string | null;
    tel: string | null;
    url: string | null;
    social: {
      twitter: string | null;
      instagram: string | null;
      line: string | null;
      linkedIn: string | null;
    };
    uid?: string;
  };
};

export type Customer = {
  stripeId: string;
  stripeLink: string;
};

export const createProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data["create"], context) => {
    const customer = await fetchStripe(context);
    await createFirestore(context, data, customer);
    await createAlgolia(context, data);

    return { displayName: data.person };
  });

export const editProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    const child = await fetchChild(context, data);

    if (context.auth?.uid === data.uid || child) {
      await editFirestore(context, data);
      await editAlgolia(context, data);

      return;
    }
  });

const fetchStripe = async (
  context: functions.https.CallableContext
): Promise<Customer> => {
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
  const stripeLink = doc.exists && doc.data()?.stripeLink;

  if (!stripeId || !stripeLink) {
    throw new functions.https.HttpsError(
      "not-found",
      "ユーザーの取得に失敗しました",
      "firebase"
    );
  }

  return { stripeId, stripeLink };
};

const fetchChild = async (
  context: functions.https.CallableContext,
  data: Data["edit"]
): Promise<string | boolean | undefined> => {
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
    .get();

  return (
    doc.exists &&
    doc.data()?.type === "parent" &&
    doc.data()?.payment?.children?.find((uid) => uid === data.uid)
  );
};

const createFirestore = async (
  context: functions.https.CallableContext,
  data: Data["create"],
  customer: Customer
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

  const profile = format.createFirestore({
    context: context,
    data: data,
    customer: customer,
  });

  if (!profile) {
    throw new functions.https.HttpsError(
      "data-loss",
      "プロフィールの作成に失敗しました",
      "algolia"
    );
  }

  if (!doc.exists) {
    await doc.ref.set(profile).catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの作成に失敗しました",
        "firebase"
      );
    });
  }
};

const editFirestore = async (
  context: functions.https.CallableContext,
  data: Data["edit"]
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
    .doc(
      context.auth.uid === data.uid ? context.auth.uid : (data.uid as string)
    )
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  const profile = format.editFirestore({
    context: context,
    data: data,
    doc: doc,
  });

  if (doc.exists && profile) {
    await doc.ref.set(profile, { merge: true }).catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "firebase"
      );
    });
  }
};

const createAlgolia = async (
  context: functions.https.CallableContext,
  data: Data["create"]
): Promise<void> => {
  const index = algolia.initIndex("companys");

  const profile: Algolia.Company = format.createAlgolia({
    context: context,
    data: data,
  });

  if (!profile) {
    throw new functions.https.HttpsError(
      "data-loss",
      "プロフィールの作成に失敗しました",
      "algolia"
    );
  }

  await index
    .partialUpdateObject(profile, {
      createIfNotExists: true,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの作成に失敗しました",
        "algolia"
      );
    });
};

const editAlgolia = async (
  context: functions.https.CallableContext,
  data: Data["edit"]
): Promise<void> => {
  const index = algolia.initIndex("companys");

  const profile: Partial<Algolia.Company> = format.editAlgolia({
    context: context,
    data: data,
  });

  if (!profile) {
    throw new functions.https.HttpsError(
      "data-loss",
      "プロフィールの作成に失敗しました",
      "algolia"
    );
  }

  await index
    .partialUpdateObject(profile, {
      createIfNotExists: true,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "algolia"
      );
    });
};
