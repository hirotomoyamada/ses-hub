const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

/**********************************
 * お知らせ・メンテナンス・利用規約 などの設定
 **********************************/

exports.editData = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // リクエストごとにループ処理
    for await (const type of Object.keys(data)) {
      if (type !== "index") {
        // ドキュメントを取得
        await db
          .collection(
            data.index === "companys"
              ? "seshub"
              : data.index === "persons" && "freelanceDirect"
          )
          .doc(type)
          .get()
          .then(async (doc) => {
            // 更新日時を挿入
            data[type].updateAt = Date.now();

            // ドキュメントがあるかどうか判定
            if (doc.exists) {
              // ドキュメントに上書き保存
              await doc.ref
                .set(
                  data[type],
                  // 上書きを許可するかどうか
                  { merge: true }
                )
                .catch((e) => {
                  throw new functions.https.HttpsError(
                    "data-loss",
                    "データの更新に失敗しました",
                    "firebase"
                  );
                });
            }
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

    return data;
  });
