import * as functions from "firebase-functions";
import { converter, db } from "../../firebase";
import * as Firestore from "../../types/firestore";

export const userAuthenticated = async (
  context: functions.https.CallableContext
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("persons")
    .withConverter(converter<Firestore.Person>())
    .doc(context.auth.uid)
    .get();

  if (doc.data()?.status !== "enable") {
    throw new functions.https.HttpsError(
      "cancelled",
      "無効なユーザーのため、処理中止",
      "firebase"
    );
  }

  if (doc.data()?.agree !== "enable") {
    throw new functions.https.HttpsError(
      "cancelled",
      "利用規約に同意が無いユーザーのため、処理中止",
      "firebase"
    );
  }

  return;
};
