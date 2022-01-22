const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const stripe = require("../../stripe").stripe;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.addProvider = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await addFirestore(context, data);
    data.email && addAlgolia(context, data);
    data.email && addStripe(context, data);

    return;
  });

const addFirestore = async (context, data) => {
  const timestamp = Date.now();

  const doc = await db
    .collection("companys")
    .doc(context.auth.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const provider = doc.data().provider;

    await doc.ref
      .set(
        !data.email
          ? { provider: data.provider, updateAt: timestamp }
          : {
              provider: [data.provider, ...provider],
              profile: {
                email: data.email,
              },
              updateAt: timestamp,
            },
        { merge: true }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プロバイダーの更新に失敗しました",
          "firebase"
        );
      });
  }
};

const addAlgolia = async (context, data) => {
  const index = algolia.initIndex("companys");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: context.auth.uid,
        email: data.email,
        updateAt: timestamp,
      },
      {
        createIfNotExists: true,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロバイダーの更新に失敗しました",
        "algolia"
      );
    });
};

const addStripe = async (context, data) => {
  const doc = await db.collection("customers").doc(context.auth.uid).get();
  const { stripeId } = doc.exists && doc.data();

  stripeId &&
    (await stripe.customers
      .update(stripeId, {
        email: data.email,
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "メールアドレスの更新に失敗しました",
          "stripe"
        );
      }));
};
