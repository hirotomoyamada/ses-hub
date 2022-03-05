import * as functions from "firebase-functions";
import { location, runtime } from "../../firebase";
import { stripe } from "../../stripe";

export const updateTaxBehavior = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("products/{productsId}/prices/{priceId}")
  .onCreate(async (_snapshot, context) => {
    stripe.prices
      .update(context.params.priceId, {
        tax_behavior: "exclusive",
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プランの税別設定に失敗しました",
          "firebase"
        );
      });
  });
