const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.updatePlan = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onUpdate(async (change, context) => {
    await userAuthenticated(context.params.uid);

    const after = change.after.data();

    const status =
      after.status === "active" || after.status === "trialing"
        ? after.status
        : "canceled";
    const price = after.items[0].plan.id;
    const start = after.current_period_start.seconds * 1000;
    const end = after.current_period_end.seconds * 1000;
    const cancel = after.canceled_at ? true : false;
    const remove = after.ended_at ? true : false;

    const plan = after.items[0].price.product.metadata.name === "plan";
    const parent = after.items[0].price.product.metadata.type === "parent";
    const account = after.items[0].price.metadata.account;

    checkPlan(plan);

    await checkDuplicate(context, remove, price);

    const children = parent && (await fetchChildren(context));

    await updateFirestore(
      context,
      status,
      cancel,
      price,
      parent,
      children,
      account,
      start,
      end
    );

    status === "canceled" && (await updateAlgolia(context, children));

    remove && deletePlan(context);

    return;
  });

const fetchChildren = async (context) => {
  const doc = await db
    .collection("companys")
    .doc(context.params.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists && doc.data().payment?.children) {
    return doc.data().payment.children;
  }
};

const deletePlan = async (context) => {
  await db
    .collection("customers")
    .doc(context.params.uid)
    .collection("subscriptions")
    .doc(context.params.sub)
    .delete()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ドキュメントの削除に失敗しました",
        "firebase"
      );
    });

  return;
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
        plan: "disable",
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
  cancel,
  price,
  parent,
  children,
  account,
  start,
  end
) => {
  await updateDoc({
    uid: context.params.uid,
    status: status,
    cancel: cancel,
    price: price,
    parent: parent,
    account: account,
    start: start,
    end: end,
  });

  if (children?.length) {
    for await (const uid of children) {
      await updateDoc({
        uid: uid,
        status: status,
        cancel: cancel,
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

const updateDoc = async ({
  uid,
  status,
  cancel,
  price,
  parent,
  child,
  account,
  start,
  end,
}) => {
  const doc = await db
    .collection("companys")
    .doc(uid)
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
          payment:
            !parent || child
              ? status === "canceled"
                ? {
                    status: status,
                    price: null,
                    start: null,
                    limit:
                      doc.data().payment?.status !== "active"
                        ? doc.data().payment?.limit
                        : 10,
                    end: null,
                    cancel: false,
                    notice: !child ? true : false,
                  }
                : {
                    status: status,
                    price: price,
                    start: start,
                    end: end,
                    cancel: cancel,
                  }
              : status === "canceled"
              ? {
                  status: status,
                  price: null,
                  start: null,
                  end: null,
                  account: 0,
                  cancel: false,
                  notice: true,
                }
              : {
                  status: status,
                  price: price,
                  account: Number(account),
                  start: start,
                  end: end,
                  cancel: cancel,
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
      });
  }

  return;
};

const checkDuplicate = async (context, remove, price) => {
  const subscriptions = await db
    .collection("customers")
    .doc(context.params.uid)
    .collection("subscriptions")
    .get();

  const docs = subscriptions?.docs?.length;
  const doc = subscriptions?.docs?.filter(
    (doc) =>
      (doc.data().status === "active" || doc.data().status === "trialing") &&
      doc.data().items[0].price.id !== price &&
      doc.data().items[0].price.product.metadata.name === "plan"
  ).length;

  if (docs > 1 && doc && remove) {
    db.collection("customers")
      .doc(context.params.uid)
      .collection("subscriptions")
      .doc(context.params.sub)
      .delete()
      .then(() => {
        throw new functions.https.HttpsError(
          "cancelled",
          "ドキュメントを削除しました",
          "firebase"
        );
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "ドキュメントの削除に失敗しました",
          "firebase"
        );
      });
  } else if (docs > 1 && doc) {
    throw new functions.https.HttpsError(
      "cancelled",
      "他のプランが有効のため処理中止",
      "firebase"
    );
  }
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
