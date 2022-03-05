import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import * as Firestore from "../../types/firestore";

export const disableNotice = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (_data: unknown, context) => {
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

    if (doc.exists) {
      await doc.ref
        .set(
          {
            payment: Object.assign(doc.data()?.payment, {
              notice: false,
            }),
          },
          { merge: true }
        )
        .catch(() => {
          throw new functions.https.HttpsError(
            "data-loss",
            "プロフィールの更新に失敗しました",
            "firebase"
          );
        });
    }

    return;
  });
