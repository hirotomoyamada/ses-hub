import * as functions from "firebase-functions";
import { db, location, runtime, converter } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";

export const updateHome = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string[], context) => {
    await userAuthenticated({
      context: context,
      demo: true,
    });

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
      .get();

    if (doc.exists) {
      await doc.ref
        .set(
          {
            home: data,
            updateAt: timestamp,
          },
          { merge: true }
        )
        .catch(() => {
          throw new functions.https.HttpsError(
            "data-loss",
            "ホームの追加に失敗しました",
            "firebase"
          );
        });
    }

    return;
  });
