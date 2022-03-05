import * as functions from "firebase-functions";
import { converter, db } from "../../firebase";
import * as Firestore from "../../types/firestore";

interface UserAuthenticated {
  context: functions.https.CallableContext;
  uid?: string;
  demo?: boolean;
  agree?: boolean;
  canceled?: boolean;
  fetch?: boolean;
  parent?: boolean;
  option?: boolean;
  index?: string;
}
export const userAuthenticated = async ({
  context,
  uid,
  demo,
  agree,
  canceled,
  fetch,
  parent,
  index,
}: UserAuthenticated): Promise<boolean> => {
  if (context?.auth) {
    const doc = await db
      .collection("companys")
      .withConverter(converter<Firestore.Company>())
      .doc(!parent ? context.auth.uid : (uid as string))
      .get();

    if (
      (!parent ? context.auth.uid : uid) ===
        functions.config().demo.ses_hub.uid &&
      demo
    ) {
      throw new functions.https.HttpsError(
        "cancelled",
        "デモのアカウントのため、実行できません"
      );
    }

    if (doc.data()?.type !== "parent" && parent) {
      throw new functions.https.HttpsError(
        "cancelled",
        "無効なアカウントのため、実行できません"
      );
    }

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

    if (doc.data()?.payment.status === "canceled" && canceled) {
      if (!fetch) {
        throw new functions.https.HttpsError(
          "cancelled",
          "無料のアカウントのため、実行できません"
        );
      } else {
        return false;
      }
    }

    return true;
  } else {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
    );
  }
};
