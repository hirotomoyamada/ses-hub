const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const fetch = require("../fetch/fetch");

/**********************************
 * ユーザーの いいね・出力・エントリー・フォロー・リクエスト・履歴 などの投稿を取得
 **********************************/

exports.extractPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // 投稿と投稿総数・ページ総数・現在のページ数を取得
    const { posts, hit } = fetchAlgolia(data);

    // 営業やエンジニアの追加情報(iconなど)を取得
    await fetchFirestore(data, posts);

    return { index: data.index, type: data.type, posts: posts, hit: hit };
  });

/**********************************
 * Firestore 取得
 **********************************/

const fetchFirestore = async (data, posts) => {
  // 取得した投稿がなければ処理中止
  if (!posts.length) {
    return;
  }

  // 追加取得が不要なindex・type を除外
  if (
    data.index !== "companys" &&
    data.index !== "persons" &&
    data.type !== "follows" &&
    data.type !== "requests"
  ) {
    return;
  }

  // 取得したオブジェクト数に応じて、ループ処理
  for (let i = 0; i < posts.length; i++) {
    // ドキュメントを取得
    await db
      .collection(data.type !== "requests" ? data.index : "companys")
      .doc(posts[i].uid)
      .get()
      .then((doc) => {
        // ドキュメントがあるかどうか判定
        if (doc.exists) {
          if (data.type === "requests" || data.index === "companys") {
            fetch.companys({ posts: posts, index: i, doc: doc });
          }
          if (data.index === "persons") {
            fetch.persons({ posts: posts, index: i, doc: doc });
          }
        }
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });
  }
};

/**********************************
 * Algolia 取得
 **********************************/

const fetchAlgolia = async (data) => {
  const index = algolia.initIndex(
    data.type !== "requests" ? data.index : "companys"
  );

  // index・type に応じてオブジェクトを指定
  const objectIDs =
    data.user.index === "companys"
      ? data.type === "children"
        ? data.user.payment.children
        : data.type === "follows"
        ? data.user[data.type]
        : data.user[data.type][data.index]
      : data.user.index === "persons" && data.type !== "requests"
      ? data.user[data.type]
      : data.user[data.type][data.index];

  // 一度に取得する投稿数を定義
  const hitsPerPage = 50;

  // 投稿総数・ページ総数・現在のページ数を定義
  const hit = {
    posts: objectIDs.length,
    pages: Math.ceil(objectIDs.length / 50),
    currentPage: data.page ? data.page : 0,
  };

  // 投稿を取得
  const posts = await index
    .getObjects(
      // hitsPerPage で指定した数ごとに取得
      objectIDs.slice(
        hit.currentPage * hitsPerPage,
        hitsPerPage * (hit.currentPage + 1)
      )
    )
    .then(({ results }) => {
      // ヒットした投稿をindexごとにオブジェクト整形
      const res = results.map((hit) =>
        hit && data.index === "matters"
          ? fetch.matters({ hit: hit })
          : hit && data.index === "resources"
          ? fetch.resources({ hit: hit })
          : hit && (data.type === "requests" || data.index === "companys")
          ? fetch.companys({ hit: hit })
          : hit && data.index === "persons" && fetch.persons({ hit: hit })
      );
      // 配列を整形
      return res.filter((res) => res);
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  return { posts, hit };
};
