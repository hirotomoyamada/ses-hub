const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.updatePlan = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onUpdate(async (change, context) => {
    const after = change.after.data();

    const status = after.status;
    const price = after.items[0].plan.id;
    const start = after.current_period_start.seconds * 1000;
    const end = after.current_period_end.seconds * 1000;
    const cancel = after.canceled_at ? true : false;
    const remove = after.ended_at ? true : false;

    const plan = after.items[0].price.product.metadata.name === "plan";
    const type = after.items[0].price.product.metadata.type === "individual";
    const account = after.items[0].price.metadata.account;

    checkPlan(plan);

    await checkDuplicate(context, remove, price);

    await updateFirestore(
      context,
      status,
      cancel,
      price,
      type,
      account,
      start,
      end
    );

    status === "canceled" && (await updateAlgolia(context));

    remove && deletePlan(context);

    return;
  });

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
};

const updateAlgolia = async (context) => {
  const index = algolia.initIndex("companys");
  const timestamp = Date.now();

  await index
    .partialUpdateObject(
      {
        objectID: context.params.uid,
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
};

const updateFirestore = async (
  context,
  status,
  cancel,
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
      await doc.ref
        .set(
          {
            payment: type
              ? status === "canceled"
                ? {
                    status: status,
                    price: null,
                    start: null,
                    end: null,
                    cancel: false,
                    notice: true,
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
                  account: account,
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
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });
};

const checkDuplicate = async (context, remove, price) => {
  const duplicate = await db
    .collection("customers")
    .doc(context.params.uid)
    .collection("subscriptions")
    .get()
    .then((subscriptions) => {
      const docs = subscriptions.docs.length;
      const doc = subscriptions.docs.filter(
        (doc) =>
          (doc.data().status === "active" ||
            doc.data().status === "trialing") &&
          doc.data().items[0].price.id !== price &&
          doc.data().items[0].price.product.metadata.name === "plan"
      ).length;

      return docs > 1 && doc;
    });

  if (duplicate && remove) {
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
  } else if (duplicate) {
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
};
