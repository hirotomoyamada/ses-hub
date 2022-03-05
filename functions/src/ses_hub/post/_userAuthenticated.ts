import * as functions from "firebase-functions";
import { converter, db } from "../../firebase";
import * as Firestore from "../../types/firestore";

interface UserAuthenticated {
  context: functions.https.CallableContext;
  index?: "matters" | "resources" | "companys" | "persons";
  type?: "likes" | "outputs" | "entries";
  canceled?: boolean;
}

export const userAuthenticated = async ({
  context,
  index,
  type,
  canceled,
}: UserAuthenticated): Promise<boolean> => {
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
    .get();

  if (doc.data()?.status !== "enable") {
    throw new functions.https.HttpsError(
      "cancelled",
      "無効なアカウントのため、実行できません"
    );
  }

  if (doc.data()?.agree !== "enable") {
    throw new functions.https.HttpsError(
      "cancelled",
      "利用規約の同意が無いアカウントため、実行できません"
    );
  }

  if (
    index === "persons" &&
    (doc.data()?.payment.status === "canceled" ||
      !doc.data()?.payment.option?.freelanceDirect)
  ) {
    throw new functions.https.HttpsError(
      "cancelled",
      "オプション未加入のアカウントのため、実行できません"
    );
  }

  if (
    canceled &&
    type !== "entries" &&
    doc.data()?.payment.status === "canceled"
  ) {
    return false;
  }

  return true;
};
