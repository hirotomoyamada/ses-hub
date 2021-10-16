const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;

const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;

exports.uploadResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    const bucket = storage.bucket("ses-hub-resume").file(context.auth.uid);

    const file = await bucket.listAll().then((res) => {
      return res;
    });

    // const dataTime = Date.now();

    // const index = algolia.initIndex("persons");

    // const res = await db
    //   .collection("persons")
    //   .doc(context.auth.uid)
    //   .get()
    //   .then(async (doc) => {
    //     const data = [
    //       null, //ファイルURL
    //       ...doc.data().data,
    //     ].slice(0, 4);

    //     doc.exists &&
    //       (await doc.ref
    //         .set(
    //           {
    //             data: data,
    //             updateAt: dataTime,
    //           },
    //           { merge: true }
    //         )
    //         .catch((e) => {
    //           throw new functions.https.HttpsError(
    //             "data-loss",
    //             "プロフィールの更新に失敗しました",
    //             "firebase"
    //           );
    //         }));

    //     return data;
    //   })
    //   .catch((e) => {
    //     throw new functions.https.HttpsError(
    //       "not-found",
    //       "ユーザーの取得に失敗しました",
    //       "firebase"
    //     );
    //   });

    // await index
    //   .partialUpdateObject(
    //     {
    //       objectID: context.auth.uid,
    //       data: res,
    //       updateAt: dataTime,
    //     },
    //     {
    //       createIfNotExists: true,
    //     }
    //   )
    //   .catch((e) => {
    //     throw new functions.https.HttpsError(
    //       "data-loss",
    //       "プロフィールの更新に失敗しました",
    //       "algolia"
    //     );
    //   });

    return { file: file, data: data };
  });
