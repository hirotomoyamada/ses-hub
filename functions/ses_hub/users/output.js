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
    await userAuthenticated({ context: context, demo: true });

    await updateFirestore({ context: context, data: data, add: true });

    return;
  });

exports.removeOutput = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ data: data, context: context, demo: true });

    await updateFirestore({ context: context, data: data });

    return;
  });

const updateFirestore = async ({ context, data, add }) => {
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
    const outputs = add
      ? doc.data().outputs?.[data.index]
      : !data.objectIDs
      ? doc
          .data()
          .outputs[data.index].filter((objectID) => objectID !== data.objectID)
      : doc
          .data()
          .outputs[data.index].filter(
            (objectID) => data.objectIDs.indexOf(objectID) === -1
          );

    await doc.ref
      .set(
        {
          outputs: {
            [data.index]: add
              ? outputs
                ? outputs.indexOf(data.objectID) < 0 && [
                    data.objectID,
                    ...outputs,
                  ]
                : [data.objectID]
              : [...outputs],
          },
          updateAt: timestamp,
        },
        { merge: true }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          add ? "出力の追加に失敗しました" : "出力の削除に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
