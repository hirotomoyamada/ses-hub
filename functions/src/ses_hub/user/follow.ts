import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";

export const addFollow = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
      canceled: true,
    });

    await updateFirestore({ context: context, data: data, add: true });

    return;
  });

export const removeFollow = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
      canceled: true,
    });

    await updateFirestore({ context: context, data: data });

    return;
  });

const updateFirestore = async ({
  context,
  data,
  add,
}: {
  context: functions.https.CallableContext;
  data: string;
  add?: boolean;
}): Promise<void> => {
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
    const follows = add
      ? doc.data()?.follows
      : doc.data()?.follows.filter((uid) => uid !== data);

    const home = add
      ? doc.data()?.home
      : doc.data()?.home.filter((uid) => uid !== data);

    if (
      (follows as string[]).indexOf(data) >= 0 ||
      (home as string[]).indexOf(data) >= 0
    ) {
      throw new functions.https.HttpsError(
        "cancelled",
        "データが重複しているため、追加できません",
        "firebase"
      );
    }

    await doc.ref
      .set(
        add
          ? home?.length && follows?.length && home.length < 15
            ? {
                follows: [data, ...follows],
                home: [data, ...home],
                updateAt: timestamp,
              }
            : follows?.length
            ? {
                follows: [data, ...follows],
                updateAt: timestamp,
              }
            : {
                follows: [data],
                home: [data],
                updateAt: timestamp,
              }
          : {
              follows: [...(follows as string[])],
              home: [...(home as string[])],
              updateAt: timestamp,
            },
        { merge: true }
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          add ? "フォローの追加に失敗しました" : "フォローの削除に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
