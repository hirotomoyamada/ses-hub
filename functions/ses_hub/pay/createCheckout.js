const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.createCheckout = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    checkDemo(context);
    onLoad(context);

    const trial = await fetchTrial(context);
    const taxRate = await fetchTaxRate();
    const session = {
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

const addCheckouts = async (context, session) => {
  return await db
    .collection("customers")
    .doc(context.auth.uid)
    .collection("checkout_sessions")
    .add(session)
    .then((doc) => {
      return doc.id;
    });
};

const fetchTrial = async (context) => {
  return await db
    .collection("companys")
    .doc(context.auth.uid)
    .get()
    .then((doc) => {
      return doc.data().payment.trial;
    });
};

const fetchTaxRate = async () => {
  return await db
    .collection("products")
    .doc("tax_rates")
    .collection("tax_rates")
    .where("active", "==", true)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.docs[0].id;
    });
};

const onLoad = async (context) => {
  await db
    .collection("companys")
    .doc(context.auth.uid)
    .get()
    .then(async (doc) => {
      doc.exists &&
        (await doc.ref
          .set(
            {
              payment: {
                load: true,
              },
            },
            { merge: true }
          )
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "プロフィールの更新に失敗しました",
              "firebase"
            );
          }));
    });
};

const checkDemo = (context) => {
  if (context.auth.uid === functions.config().demo.ses_hub.uid) {
    throw new functions.https.HttpsError(
      "cancelled",
      "デモユーザーのため、処理中止",
      "firebase"
    );
  }
};
