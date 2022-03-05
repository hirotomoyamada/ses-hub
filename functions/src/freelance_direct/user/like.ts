import * as functions from "firebase-functions";
import { db, location, runtime, converter } from "../../firebase";
import * as Firestore from "../../types/firestore";
import { userAuthenticated } from "./_userAuthenticated";

export const addLike = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateFirestore({ context: context, data: data, add: true });

    return;
  });

export const removeLike = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

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
    .collection("persons")
    .doc(context.auth.uid)
    .withConverter(converter<Firestore.Person>())
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const likes = add
      ? doc.data()?.likes
      : doc.data()?.likes.filter((objectID) => objectID !== data);

    if (likes && likes.indexOf(data) >= 0) {
      throw new functions.https.HttpsError(
        "cancelled",
        "データが重複しているため、追加できません",
        "firebase"
      );
    }

    await doc.ref
      .set(
        {
          likes: add
            ? likes
              ? [data, ...likes]
              : [data]
            : [...(likes as string[])],
          updateAt: timestamp,
        },
        { merge: true }
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          add ? "いいねの追加に失敗しました" : "いいねの削除に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
