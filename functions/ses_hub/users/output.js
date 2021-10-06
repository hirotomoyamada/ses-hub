const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.addOutput = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ data: data, context: context, demo: true });

    const dataTime = Date.now();

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const outputs = doc.data().outputs?.[data.index];
          doc.ref
            .set(
              outputs
                ? outputs.indexOf(data.objectID) < 0 && {
                    outputs: { [data.index]: [data.objectID, ...outputs] },
                    updateAt: dataTime,
                  }
                : {
                    outputs: { [data.index]: [data.objectID] },
                    updateAt: dataTime,
                  },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "出力の追加に失敗しました",
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

exports.removeOutput = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ data: data, context: context, demo: true });

    const dataTime = Date.now();

    await db
      .collection("companys")
      .doc(context.auth.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const outputs = !data.objectIDs
            ? doc
                .data()
                .outputs[data.index].filter(
                  (objectID) => objectID !== data.objectID
                )
            : doc
                .data()
                .outputs[data.index].filter(
                  (objectID) => data.objectIDs.indexOf(objectID) === -1
                );

          doc.ref
            .set(
              {
                outputs: { [data.index]: [...outputs] },
                updateAt: dataTime,
              },
              { merge: true }
            )
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "出力の削除に失敗しました",
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
