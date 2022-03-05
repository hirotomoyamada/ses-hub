import * as functions from "firebase-functions";
import { converter, db } from "../../firebase";
import * as Firestore from "../../types/firestore";

interface PostAuthenticated {
  context: functions.https.CallableContext;
  canceled?: boolean;
}

export const postAuthenticated = async ({
  context,
  canceled,
}: PostAuthenticated): Promise<void> => {
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

  if (context.auth.uid === functions.config().demo.ses_hub.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "デモのアカウントのため、実行できません",
    );
  }

  if (doc.data()?.status !== "enable") {
    throw new functions.https.HttpsError(
      "cancelled",
      "無効なアカウントのため、実行できません",
    );
  }

  if (doc.data()?.agree !== "enable") {
    throw new functions.https.HttpsError(
      "cancelled",
      "利用規約の同意が無いアカウントため、実行できません",
    );
  }

  if (doc.data()?.payment.status === "canceled" && canceled) {
    throw new functions.https.HttpsError(
      "cancelled",
      "無料のアカウントのため、実行できません",
    );
  }
};
