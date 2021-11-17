const functions = require("firebase-functions");
const db = require("../../firebase").db;
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

/**********************************
 * アカウント の プラン・オプション を設定
 **********************************/

exports.updateUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // リクエスト数に応じてループ処理
    for await (const user of data) {
      // Firestore へ上書き保存
      await updateFirestore(user);
      // Algolia へ上書き保存
      await updateAlgolia(user);
    }

    return data;
  });

/**********************************
 * Firestore 保存
 **********************************/

const updateFirestore = async (user) => {
  // ドキュメントを取得
  await db
    .collection("companys")
    .doc(user.uid)
    .get()
    .then((doc) => {
      // ドキュメントがあるかどうか判定
      if (doc.exists) {
        // ドキュメントに上書き保存
        doc.ref
          .set(
            // オプションの指定があれば
            user.option
              ? {
                  payment: {
                    status: user.status,
                    option: {
                      freelanceDirect: user.option === "enable" ? true : false,
                    },
                  },
                }
              : // オプションの指定がなければ
                {
                  payment: {
                    status: user.status,
                  },
                },
            // 上書きを許可するかどうか
            {
              merge: true,
            }
          )
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "ユーザーの編集に失敗しました",
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
};

/**********************************
 * Algolia 保存
 **********************************/

const updateAlgolia = async (user) => {
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject(
      // オプションの指定があれば
      user.option
        ? {
            objectID: user.uid,
            plan: user.status !== "canceled" ? "enable" : "disable",
            freelanceDirect: user.option,
          }
        : // オプションの指定がなければ
          {
            objectID: user.uid,
            plan: user.status !== "canceled" ? "enable" : "disable",
          },
      // オブジェクトがなければ処理中止
      {
        createIfNotExists: false,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ユーザーの編集に失敗しました",
        "algolia"
      );
    });
};
