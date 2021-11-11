const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.createPlan = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    const metadata = data.items[0].price.product.metadata;

    const status = data.status;
    const price = data.items[0].plan.id;
    const start = data.current_period_start.seconds * 1000;
    const end = data.current_period_end.seconds * 1000;
    const plan = metadata.name === "plan";

    const type = metadata.type === "individual";
    const account = data.items[0].price.metadata.account;

    checkPlan(plan);

    await updateFirestore(context, status, price, type, account, start, end);

    await updateAlgolia(context);

    return;
  });

const updateAlgolia = async (context) => {
  const index = algolia.initIndex("companys");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: context.params.uid,
        plan: "enable",
        updateAt: timestamp,
      },
      {
        createIfNotExists: true,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "algolia"
      );
    });
};

const updateFirestore = async (
  context,
  status,
  price,
  type,
  account,
  start,
  end
) => {
  await db
    .collection("companys")
    .doc(context.params.uid)
    .get()
    .then(async (doc) => {
      doc.exists &&
        (await doc.ref
          .set(
            {
              payment: type
                ? {
                    status: status,
                    price: price,
                    start: start,
                    end: end,
                    trial: false,
                    cancel: false,
                    notice: false,
                    load: false,
                  }
                : {
                    status: status,
                    price: price,
                    account: Number(account),
                    children: [],
                    start: start,
                    end: end,
                    trial: false,
                    cancel: false,
                    notice: false,
                    load: false,
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
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return;
};

const checkPlan = (plan) => {
  if (!plan) {
    throw new functions.https.HttpsError(
      "cancelled",
      "プランの更新では無いので処理中止",
      "firebase"
    );
  }

  return;
};
