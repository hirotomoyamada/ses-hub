import * as functions from "firebase-functions";
import { converter, db } from "../../firebase";
import * as Firestore from "../../types/firestore";

export const userAuthenticated = async (
  uid: string | undefined,
  price?: string,
  product?: string
): Promise<void> => {
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(uid)
    .get();

  if (uid === functions.config().demo.ses_hub.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "デモユーザーのため、処理中止",
      "firebase"
    );
  }

  if (doc.exists) {
    const children = doc.data()?.payment?.children?.length;
    const parent = doc.data()?.type === "parent";

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

    if (doc.data()?.type === "child") {
      throw new functions.https.HttpsError(
        "cancelled",
        "子アカウントのため、処理中止",
        "firebase"
      );
    }

    if (children && price && product) {
      const doc = await db
        .collection("products")
        .doc(product)
        .collection("prices")
        .doc(price)
        .get();

      const account = doc.data()?.metadata?.account
        ? Number(doc.data()?.metadata.account)
        : null;

      if (!account || !parent) {
        return;
      }

      if (children >= account) {
        throw new functions.https.HttpsError(
          "cancelled",
          "保有しているアカウントがプランの上限以上のため処理中止",
          "firebase"
        );
      }
    }
  }
};
