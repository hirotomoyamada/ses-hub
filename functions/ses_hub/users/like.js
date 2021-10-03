const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

exports.addLike = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid === functions.config().demo.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "デモユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.data().status !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "無効なユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().agree !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "利用規約に同意が無いユーザーのため、処理中止",
            "firebase"
          );
        }
      });

    const dataTime = Date.now();
    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const likes = doc.data().likes?.[data.index];
          doc.ref
            .set(
              likes
                ? likes.indexOf(data.objectID) < 0 && {
                    likes: { [data.index]: [data.objectID, ...likes] },
                    updateAt: dataTime,
                  }
                : {
                    likes: { [data.index]: [data.objectID] },
                    updateAt: dataTime,
                  },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "いいねの追加に失敗しました",
                "firebase"
              );
            });
        }
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    return;
  });

exports.removeLike = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid === functions.config().demo.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "デモユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.data().status !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "無効なユーザーのため、処理中止",
            "firebase"
          );
        }

        if (doc.data().agree !== "enable") {
          throw new functions.https.HttpsError(
            "cancelled",
            "利用規約に同意が無いユーザーのため、処理中止",
            "firebase"
          );
        }
      });

    const dataTime = Date.now();
    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const likes = doc
            .data()
            .likes[data.index].filter((objectID) => objectID !== data.objectID);

          doc.ref
            .set(
              {
                likes: { [data.index]: [...likes] },
                updateAt: dataTime,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "いいねの削除に失敗しました",
                "firebase"
              );
            });
        }
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    return;
  });
