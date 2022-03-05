import * as functions from "firebase-functions";
import { db, converter } from "../../firebase";
import * as Firestore from "../../types/firestore";

interface UserAuthenticated {
  context: functions.https.CallableContext;
  demo?: boolean;
  agree?: boolean;
}

export const userAuthenticated = async ({
  context,
  demo,
  agree,
}: UserAuthenticated) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません"
    );
  }

  if (
    context.auth?.uid === functions.config().demo.freelance_direct.uid &&
    demo
  ) {
    throw new functions.https.HttpsError(
      "cancelled",
      "デモのアカウントのため、実行できません"
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
      "無効なアカウントのため、実行できません"
    );
  }

  if (doc.data()?.agree !== "enable" && !agree) {
    throw new functions.https.HttpsError(
      "cancelled",
      "利用規約の同意が無いアカウントため、実行できません"
    );
  }
};
