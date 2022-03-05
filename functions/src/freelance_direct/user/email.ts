import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { db, location, runtime, converter } from "../../firebase";
import * as Firestore from "../../types/firestore";
import { userAuthenticated } from "./_userAuthenticated";

export const changeEmail = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({ context: context, demo: true });

    await editFirestore(context, data);
    await editAlgolia(context, data);

    return;
  });

const editFirestore = async (
  context: functions.https.CallableContext,
  data: string
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
    .collection("persons")
    .withConverter(converter<Firestore.Person>())
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
    const profile = Object.assign(doc.data()?.profile, { email: data });

    if (profile) {
      await doc.ref
        .set(
          {
            profile: profile,
            updateAt: timestamp,
          },
          { merge: true }
        )
        .catch(() => {
          throw new functions.https.HttpsError(
            "data-loss",
            "メールアドレスの更新に失敗しました",
            "firebase"
          );
        });
    }
  }
};

const editAlgolia = async (
  context: functions.https.CallableContext,
  data: string
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const index = algolia.initIndex("persons");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: context.auth.uid,
        email: data,
        updateAt: timestamp,
      },
      {
        createIfNotExists: true,
      }
    )
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "メールアドレスの更新に失敗しました",
        "algolia"
      );
    });
};
