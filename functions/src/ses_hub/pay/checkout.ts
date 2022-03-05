import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";

type Data = {
  productId: string;
  priceId: string;
  url: {
    success: string;
    cancel: string;
  };
};

export const createCheckout = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context.auth?.uid, data.priceId, data.productId);

    checkDemo(context);
    onLoad(context);

    const trial = await fetchTrial(context);
    const taxRate = await fetchTaxRate();
    const session: Firestore.CheckoutSession = {
      allow_promotion_codes: false,
      billing_address_collection: "auto",
      tax_rates: [taxRate],
      trial_from_plan: trial,
      line_items: [{ price: data.priceId, quantity: 1 }],
      success_url: data.url.success,
      cancel_url: data.url.cancel,
    };

    const checkouts = await addCheckouts(context, session);

    return checkouts;
  });

const addCheckouts = async (
  context: functions.https.CallableContext,
  session: Firestore.CheckoutSession
) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("customers")
    .doc(context.auth.uid)
    .collection("checkout_sessions")
    .withConverter(converter<Firestore.CheckoutSession>())
    .add(session);

  return doc.id;
};

const fetchTrial = async (
  context: functions.https.CallableContext
): Promise<boolean> => {
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

  return doc.data()?.payment.trial as boolean;
};

const fetchTaxRate = async () => {
  const querySnapshot = await db
    .collection("products")
    .withConverter(converter<Firestore.Product>())
    .doc("tax_rates")
    .collection("tax_rates")
    .withConverter(converter<Firestore.TaxRates>())
    .where("active", "==", true)
    .get();

  return querySnapshot.docs[0].id;
};

const onLoad = async (
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
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(context.auth.uid)
    .get();

  if (doc.exists) {
    await doc.ref
      .set(
        {
          payment: Object.assign(doc.data()?.payment, {
            load: true,
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
};

const checkDemo = (context: functions.https.CallableContext): void => {
  if (context.auth?.uid === functions.config().demo.ses_hub.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "デモユーザーのため、処理中止",
      "firebase"
    );
  }
};
