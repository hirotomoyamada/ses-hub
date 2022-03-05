import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";

type Products = {
  [T in string]: {
    id: string;
    name: string | null;
    account: number | null;
    interval: string;
    interval_count: number;
    trial_period_days: number | null;
    unit_amount: number;
  }[];
};

export const fetchProducts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (_data: unknown, context) => {
    await userAuthenticated(context.auth?.uid);

    const products: Products = {};
    const tax = await fetchTax();

    await fetchPrices(products);

    await verificationActive(products, context);

    return { products: products, tax: tax };
  });

const verificationActive = async (
  products: Products,
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

  const type = doc.data()?.type ? doc.data()?.type : "individual";

  const collection = await db
    .collection("products")
    .withConverter(converter<Firestore.Product>())
    .get();

  collection?.forEach((doc) => {
    if (
      doc.data().active &&
      (doc.data().metadata.type === type ||
        doc.data().metadata.name === "option")
    ) {
      const key = doc.data().metadata.name;

      if (!key) {
        return;
      }

      delete Object.assign(products, {
        [key]: {
          id: doc.id,
          name: doc.data().name,
          type: doc.data().metadata.type,
          desc: doc.data().description,
          prices: products[doc.id],
        },
      })[doc.id];
    } else {
      delete products[doc.id];
    }
  });
};

const fetchPrices = async (products: Products): Promise<void> => {
  const collection = await db
    .collectionGroup("prices")
    .withConverter(converter<Firestore.Price>())
    .where("active", "==", true)
    .orderBy("unit_amount")
    .get();

  collection?.forEach((doc) => {
    const data = doc.data();

    const product = {
      id: doc.id,
      name: data.description,
      account: data.metadata.account ? Number(data.metadata.account) : null,
      interval: data.recurring.interval,
      interval_count: data.recurring.interval_count,
      trial_period_days: data.recurring.trial_period_days,
      unit_amount: data.unit_amount,
    };

    const key = doc.ref.parent.parent?.path?.replace("products/", "");

    if (!key) {
      return;
    }

    if (!products[key]) {
      products[key] = [product];
    } else {
      products[key] = [...products[key], product];
    }
  });
};

const fetchTax = async (): Promise<number> => {
  const collection = await db
    .collection("products")
    .withConverter(converter<Firestore.Product>())
    .doc("tax_rates")
    .collection("tax_rates")
    .withConverter(converter<Firestore.TaxRates>())
    .where("active", "==", true)
    .get();

  return collection?.docs?.[0]?.data().percentage * 0.01 + 1;
};
