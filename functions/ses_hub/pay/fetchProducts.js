const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.fetchProducts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async () => {
    const products = {};

    await db
      .collectionGroup("prices")
      .where("active", "==", true)
      .orderBy("unit_amount")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (!products[doc.ref.parent.parent.path.replace("products/", "")]) {
            products[doc.ref.parent.parent.path.replace("products/", "")] = [
              {
                id: doc.id,
                name: doc.data().description,
                interval: doc.data().recurring.interval,
                interval_count: doc.data().recurring.interval_count,
                trial_period_days: doc.data().recurring.trial_period_days,
                unit_amount: doc.data().unit_amount,
              },
            ];
          } else {
            products[doc.ref.parent.parent.path.replace("products/", "")] = [
              ...products[doc.ref.parent.parent.path.replace("products/", "")],
              {
                id: doc.id,
                name: doc.data().description,
                interval: doc.data().recurring.interval,
                interval_count: doc.data().recurring.interval_count,
                trial_period_days: doc.data().recurring.trial_period_days,
                unit_amount: doc.data().unit_amount,
              },
            ];
          }
        });
      });

    await db
      .collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().active) {
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
      });

    const tax = await db
      .collection("products")
      .doc("tax_rates")
      .collection("tax_rates")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs[0].data().percentage * 0.01 + 1;
      });

    return { products: products, tax: tax };
  });
