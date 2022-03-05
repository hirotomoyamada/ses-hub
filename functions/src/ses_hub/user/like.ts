import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";

type Data = {
  index: "matters" | "resources" | "persons";
  uid: string;
  objectID?: string;
};

export const addLike = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
      index: data.index,
    });

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
  data: Data;
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
    const likes = add
      ? doc.data()?.likes?.[data.index]
      : doc
          .data()
          ?.likes[data.index].filter(
            (id) => id !== (data.objectID ? data.objectID : data.uid)
          );

    if (likes && likes.indexOf(data.objectID ? data.objectID : data.uid) >= 0) {
      throw new functions.https.HttpsError(
        "cancelled",
        "データが重複しているため、追加できません",
        "firebase"
      );
    }

    await doc.ref
      .set(
        {
          likes: Object.assign(doc.data()?.likes, {
            [data.index]: add
              ? likes?.length
                ? [data.objectID ? data.objectID : data.uid, ...likes]
                : [data.objectID ? data.objectID : data.uid]
              : [...(likes as string[])],
          }),
          updateAt: timestamp,
        },
        { merge: true }
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "いいねの追加に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
