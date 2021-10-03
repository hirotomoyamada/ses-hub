const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.updatePlan = functions
  .region(location)
  .runWith(runtime)
  .firestore.document("customers/{uid}/subscriptions/{sub}")
  .onUpdate(async (change, context) => {
    const status = change.after.data().status;
    const price = change.after.data().items[0].plan.id;
    const start = change.after.data().current_period_start.seconds * 1000;
    const end = change.after.data().current_period_end.seconds * 1000;
    const cancel = change.after.data().canceled_at ? true : false;
    const remove = change.after.data().ended_at ? true : false;
    const plan =
      change.after.data().items[0].price.product.metadata.name === "plan"
        ? true
        : false;

    if (!plan) {
      throw new functions.https.HttpsError(
        "cancelled",
        "プランの更新では無いので処理中止",
        "firebase"
      );
    }

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

        return docs > 1 && doc ? true : false;
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

    await db
      .collection("companys")
      .doc(context.params.uid)
      .get()
      .then(async (doc) => {
        if (status === "canceled") {
          await doc.ref
            .set(
              {
                payment: {
                  status: status,
                  price: null,
                  start: null,
                  end: null,
                  cancel: false,
                  notice: true,
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
        } else {
          await doc.ref
            .set(
              {
                payment: {
                  status: status,
                  price: price,
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
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザー全体の取得に失敗しました",
          "firebase"
        );
      });

    if (remove) {
      db.collection("customers")
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
    }
  });
