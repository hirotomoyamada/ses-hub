import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import { userAuthenticated } from "./_userAuthenticated";
import * as format from "./_format";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";

export type Parent = Partial<Firestore.Company>;
export type Child = Partial<Firestore.Company>;

export const createChild = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({
      context: context,
      uid: data,
      demo: true,
      canceled: true,
      parent: true,
    });

    const parent: Parent = await fetchParent(context, data);

    const user = await createFirestore(context, parent);

    await createAlgolia(context, parent);

    return user;
  });

const fetchParent = async (
  context: functions.https.CallableContext,
  uid: string
): Promise<Parent> => {
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
    .doc(uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "アカウントの作成に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const payment = doc.data()?.payment;

    if (!payment) {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    }

    const children = payment.children?.length
      ? [...payment.children, context.auth.uid]
      : [context.auth.uid];
    const account = payment.account;

    if (!account || doc.data()?.type !== "parent") {
      throw new functions.https.HttpsError(
        "cancelled",
        "有効なアカウントまたはプランでは無いため、処理中止",
        "firebase"
      );
    }

    if (children.length >= account) {
      throw new functions.https.HttpsError(
        "cancelled",
        "作成できる上限を超えているため処理中止",
        "firebase"
      );
    }

    await doc.ref
      .set({ payment: { ...payment, children: children } }, { merge: true })
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プロフィールの更新に失敗しました",
          "firebase"
        );
      });

    return { ...doc.data(), uid: doc.id };
  } else {
    throw new functions.https.HttpsError(
      "not-found",
      "ユーザーの取得に失敗しました",
      "firebase"
    );
  }
};

const createFirestore = async (
  context: functions.https.CallableContext,
  parent: Parent
): Promise<Child> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const child = format.createChildFirestore({
    context: context,
    parent: parent,
  });

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

  !doc.exists &&
    (await doc.ref.set(child).catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "firebase"
      );
    }));

  return {
    uid: context.auth?.uid,
    icon: child.icon,
    cover: child.cover,
    type: child.type,
    profile: child.profile,
    createAt: child.createAt,
  };
};

const createAlgolia = async (
  context: functions.https.CallableContext,
  parent: Parent
): Promise<void> => {
  const index = algolia.initIndex("companys");

  const profile: Partial<Algolia.Company> = format.createChildAlgolia({
    context: context,
    parent: parent,
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
