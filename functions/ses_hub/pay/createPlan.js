const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.createPlan = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onCreate(async (snapshot, context) => {
    await userAuthenticated(context.params.uid);

    const data = snapshot.data();
    const metadata = data.items[0].price.product.metadata;

    const status = data.status;
    const price = data.items[0].plan.id;
    const start = data.current_period_start.seconds * 1000;
    const end = data.current_period_end.seconds * 1000;
    const plan = metadata.name === "plan";

    const parent = metadata.type === "parent";
    const account = data.items[0].price.metadata.account;

    checkPlan(plan);

    const children = parent && (await fetchChildren(context));

    await updateFirestore(
      context,
      status,
      price,
      parent,
      children,
      account,
      start,
      end
    );
    await updateAlgolia(context, children);

    return;
  });

const fetchChildren = async (context) => {
  const children = await db
    .collection("companys")
    .doc(context.params.uid)
    .get()
    .then(async (doc) => {
      if (doc.exists && doc.data().payment?.children) {
        return doc.data().payment.children;
      }
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return children;
};

const updateAlgolia = async (context, children) => {
  await partialUpdateObject(context.params.uid);

  if (children?.length) {
    for await (const uid of children) {
      await partialUpdateObject(uid);
    }
  }

  return;
};

const partialUpdateObject = async (uid) => {
  const index = algolia.initIndex("companys");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: uid,
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

  return;
};

const updateFirestore = async (
  context,
  status,
  price,
  parent,
  children,
  account,
  start,
  end
) => {
  await set({
    uid: context.params.uid,
    status: status,
    price: price,
    parent: parent,
    account: account,
    start: start,
    end: end,
  });

  if (children?.length) {
    for await (const uid of children) {
      await set({
        uid: uid,
        status: status,
        price: price,
        parent: parent,
        child: true,
        account: account,
        start: start,
        end: end,
      });
    }
  }

  return;
};

const set = async ({
  uid,
  status,
  price,
  parent,
  child,
  account,
  start,
  end,
}) => {
  await db
    .collection("companys")
    .doc(uid)
    .get()
    .then(async (doc) => {
      const children =
        parent && !child && doc.data().payment?.children
          ? doc.data().payment.children
          : [];

      doc.exists &&
        (await doc.ref
          .set(
            {
              payment:
                !parent || child
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
                      children: children,
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
