const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;
const organize = require("../functions/organize").organize;

const fetch = require("../fetch/fetch");

/**********************************
 * 営業・エンジニア を取得
 **********************************/

exports.fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // ドキュメントを取得
    const user = await db
      .collection(data.index)
      .doc(data.uid)
      .get()
      .then(async (doc) => {
        // ドキュメントがあるかどうか判定
        if (doc.exists) {
          // ユーザーが保持している投稿情報が、存在しているかどうかを判定
          return await organize({ data: data, user: doc.data() })
            .then(async (lists) => {
              // 親アカウントを定義
              const parent =
                doc.data().type === "child"
                  ? await fetchParent(doc.data().payment?.parent)
                  : null;

              // ユーザー情報をindexごとにオブジェクト整形
              return data.index === "companys"
                ? fetch.companys({
                    index: data.index,
                    doc: doc,
                    lists: lists,
                    parent: parent,
                  })
                : fetch.persons({
                    index: data.index,
                    doc: doc,
                    lists: lists,
                  });
            })
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

    return user;
  });

/**********************************
 * 親アカウント 取得
 **********************************/

const fetchParent = async (uid) => {
  // ドキュメントを取得
  const parent = await db
    .collection("companys")
    .doc(uid)
    .get()
    .then((doc) => {
      // ドキュメントがあるかどうか判定
      if (doc.exists) {
        return fetch.companys({
          index: "companys",
          doc: doc,
        });
      }
    });

  return parent;
};
