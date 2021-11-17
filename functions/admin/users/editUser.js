const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const edit = require("../edit/edit");

/**********************************
 * 営業・エンジニア を編集
 **********************************/

exports.editUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // indexに応じてオブジェクトを整形
    const user =
      data.index === "companys"
        ? edit.companys({ data: data })
        : data.index === "persons" && edit.persons({ data: data });

    // Firestore 上書き保存
    await updateFirestore(data, user);

    // Algolia 上書き保存
    await updateAlgolia(data, user);
  });

/**********************************
 * Algolia 上書き保存
 **********************************/

const updateAlgolia = async (data, user) => {
  const index = algolia.initIndex(data.index);

  await index
    .partialUpdateObject(
      // indexに応じてオブジェクトを整形
      data.index === "companys"
        ? edit.companys({ user: user })
        : data.index === "persons" && edit.persons({ user: user }),
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

/**********************************
 * Firestore 上書き保存
 **********************************/

const updateFirestore = async (data, user) => {
  // ドキュメントを取得
  await db
    .collection(data.index)
    .doc(data.user.uid)
    .get()
    .then(async (doc) => {
      // ドキュメントがあるかどうか判定
      doc.exists &&
        // ドキュメントに上書き保存
        (await doc.ref
          .set(
            // 営業であれば
            data.index === "companys"
              ? {
                  type: user.type,
                  icon: user.icon,
                  cover: user.cover,
                  status: user.status,
                  profile: user.profile,
                  updateAt: user.updateAt,
                }
              : // エンジニアであれば
                {
                  icon: user.icon,
                  cover: user.cover,
                  status: user.status,
                  profile: user.profile,
                  updateAt: user.updateAt,
                },
            // 上書きを許可するかどうか
            { merge: true }
          )
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "ユーザーの編集に失敗しました",
              "firebase"
            );
          }));
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });
};
