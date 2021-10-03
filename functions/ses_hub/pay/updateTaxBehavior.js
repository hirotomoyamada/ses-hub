const functions = require("firebase-functions");
const stripe = require("../../stripe").stripe;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.updateTaxBehavior = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("products/{productsId}/prices/{priceId}")
  .onCreate(async (snapshot, context) => {
    stripe.prices
      .update(context.params.priceId, {
        tax_behavior: "exclusive",
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プランの税別設定に失敗しました",
          "firebase"
        );
      });
  });
