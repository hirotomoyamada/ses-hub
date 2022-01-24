const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const stripe = require("../../stripe").stripe;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.changeEmail = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await editFirestore(context, data);
    await editAlgolia(context, data);
    await editStripe(context, data);

    return;
  });

const editFirestore = async (context, data) => {
  const timestamp = Date.now();

  const doc = await db
    .collection("companys")
    .doc(!data.uid ? context.auth.uid : data.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    await doc.ref
      .set(
        {
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
          "メールアドレスの更新に失敗しました",
          "firebase"
        );
      });
  }
};

const editAlgolia = async (context, data) => {
  const index = algolia.initIndex("companys");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: !data.uid ? context.auth.uid : data.uid,
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
        "メールアドレスの更新に失敗しました",
        "algolia"
      );
    });
};

const editStripe = async (context, data) => {
  const doc = await db
    .collection("customers")
    .doc(!data.uid ? context.auth.uid : data.uid)
    .get();
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
