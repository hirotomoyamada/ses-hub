import * as functions from "firebase-functions";
import { converter, db, location, runtime, timeZone } from "../../firebase";
import * as Firestore from "../../types/firestore";

export const updateNotice = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 */3 * *")
  .timeZone(timeZone)
  .onRun(async () => {
    const querySnapshot = await db
      .collection("companys")
      .withConverter(converter<Firestore.Company>())
      .where("type", "!=", "child")
      .where("payment.status", "==", "canceled")
      .get()
      .catch(() => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    querySnapshot?.forEach(async (doc) => {
      await doc.ref
        .set(
          {
            payment: Object.assign(doc.data().payment, {
              notice: true,
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
    });

    return;
  });

export const updateLimit = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 1 * *")
  .timeZone(timeZone)
  .onRun(async () => {
    const querySnapshot = await db
      .collection("companys")
      .withConverter(converter<Firestore.Company>())
      .get()
      .catch(() => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    querySnapshot?.forEach(async (doc) => {
      await doc.ref
        .set(
          {
            payment: Object.assign(doc.data().payment, {
              limit: 10,
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
    });

    return;
  });
