const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.fetchProducts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context.auth.uid);

    const products = {};

    const doc = await db.collection("companys").doc(context.auth.uid).get();

    const type = doc.data().type ? doc.data().type : "individual";

    const tax =
      (await fetchCollection("tax_rates").docs[0].data().percentage) * 0.01 + 1;

    fetchCollection("prices")?.forEach((doc) => {
      const product = {
        id: doc.id,
        name: doc.data().description,
        account: doc.data().metadata?.account
          ? Number(doc.data().metadata.account)
          : null,
        interval: doc.data().recurring.interval,
        interval_count: doc.data().recurring.interval_count,
        trial_period_days: doc.data().recurring.trial_period_days,
        unit_amount: doc.data().unit_amount,
      };

      if (!products[doc.ref.parent.parent.path.replace("products/", "")]) {
        products[doc.ref.parent.parent.path.replace("products/", "")] = [
          product,
        ];
      } else {
        products[doc.ref.parent.parent.path.replace("products/", "")] = [
          ...products[doc.ref.parent.parent.path.replace("products/", "")],
          product,
        ];
      }
    });

    fetchCollection("products")?.forEach((doc) => {
      if (
        doc.data().active &&
        (doc.data().metadata.type === type ||
          doc.data().metadata.name === "option")
      ) {
        delete Object.assign(products, {
          [doc.data().metadata.name]: {
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

    return { products: products, tax: tax };
  });

const fetchCollection = async (collection) => {
  collection === "prices"
    ? await db
        .collectionGroup("prices")
        .where("active", "==", true)
        .orderBy("unit_amount")
        .get()
    : collection === "products"
    ? await db.collection("products").get()
    : await db
        .collection("products")
        .doc("tax_rates")
        .collection("tax_rates")
        .where("active", "==", true)
        .get();
};
