const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

/**********************************
 * ログイン
 **********************************/

exports.login = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    const auth = {
      uid: context.auth.uid,
      seshub: {},
      freelanceDirect: {},
    };

    // Firestore(seshub, freelanceDirect)を取得
    for await (const index of Object.keys(auth)) {
      if (index !== "uid") {
        // ドキュメントを取得
        await db
          .collection(index)
          .get()
          .then((docs) => {
            // 取得した配列をループ処理
            docs.forEach((doc) => {
              // 取得したオブジェクトを挿入
              auth[index][doc.id] = doc.data();
            });
          })
          .catch((e) => {
            throw new functions.https.HttpsError(
              "not-found",
              "データの取得に失敗しました",
              "firebase"
            );
          });
      }
    }

    return auth;
  });
