const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;
const fetch = require("../fetch/fetch");

/**********************************
 * 営業・エンジニア・案件・人材 を取得
 **********************************/

exports.fetchPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // 投稿と投稿総数・ページ総数・現在のページ数を取得
    const { hit, posts } = await fetchAlgolia(data);

    // 営業やエンジニアの追加情報(iconなど)を取得
    posts.length && (await fetchFirestore(data, posts));

    return { index: data.index, posts: posts, hit: hit };
  });

/**********************************
 * Firetore 取得
 **********************************/

const fetchFirestore = async (data, posts) => {
  // 取得したオブジェクト数に応じて、ループ処理
  for (let i = 0; i < posts.length; i++) {
    // ドキュメントを取得
    await db
      .collection(
        data.index === "matters" ||
          data.index === "resources" ||
          data.index === "companys"
          ? "companys"
          : data.index === "persons" && "persons"
      )
      .doc(posts[i].uid)
      .get()
      .then((doc) => {
        // ドキュメントがあるかどうか判定
        if (doc.exists) {
          // 案件・人材の場合
          if (data.index === "matters" || data.index === "resources") {
            // オブジェクトへ追加挿入
            posts[i].user = {
              type: doc.data().type,
              name: doc.data().profile.name,
              person: doc.data().profile.person,
            };
          }
          // 営業の場合
          if (data.index === "companys") {
            // オブジェクトへ追加挿入
            fetch.companys({ posts: posts, index: i, doc: doc });
          }
          // エンジニアの場合
          if (data.index === "persons") {
            // オブジェクトへ追加挿入
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
  // リクエストに応じて、Replica indicesを切り替え
  const index = algolia.initIndex(
    !data.target ||
      ((data.index === "matters" || data.index === "resources") &&
        data.target === "createAt") ||
      ((data.index === "companys" || data.index === "persons") &&
        data.target === "lastLogin")
      ? data.index
      : `${data.index}_${data.target}_${data.type}`
  );

  // 現在のページ数を定義
  const hit = {
    currentPage: data.page ? data.page : 0,
  };

  // 投稿を取得
  const posts = await index
    .search(data.value, {
      page: hit.currentPage,
      filters: data.filter === "all" ? "" : data.filter,
    })
    .then((result) => {
      // 投稿総数を取得
      hit.posts = result.nbHits;
      // ページ総数を取得
      hit.pages = result.nbPages;
      // ヒットした投稿をindexごとにオブジェクト整形
      const res = result.hits.map((hit) =>
        data.index === "matters"
          ? fetch.matters({ hit: hit })
          : data.index === "resources"
          ? fetch.resources({ hit: hit })
          : data.index === "companys"
          ? fetch.companys({ hit: hit })
          : data.index === "persons" && fetch.persons({ hit: hit })
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

  return { hit, posts };
};
