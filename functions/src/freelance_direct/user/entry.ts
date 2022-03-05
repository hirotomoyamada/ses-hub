import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import * as Firestore from "../../types/firestore";
import { userAuthenticated } from "./_userAuthenticated";

export const addEntry = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
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
      const entries = doc.data()?.entries;

      if (entries && entries.indexOf(data) >= 0) {
        throw new functions.https.HttpsError(
          "cancelled",
          "データが重複しているため、追加できません",
          "firebase"
        );
      }

      await doc.ref
        .set(
          {
            entries: entries ? [data, ...entries] : [data],
            updateAt: timestamp,
          },
          { merge: true }
        )
        .catch(() => {
          throw new functions.https.HttpsError(
            "data-loss",
            "エントリーの追加に失敗しました",
            "firebase"
          );
        });
    }

    return;
  });
