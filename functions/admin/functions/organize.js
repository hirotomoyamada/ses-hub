const db = require("../../firebase").db;
const algolia = require("../../algolia").algolia;

/**********************************
 * ユーザーが保持している投稿が存在しているかどうか判定
 **********************************/

exports.organize = async ({ data, user }) => {
  // 取得した投稿を格納しておくオブジェクト
  const lists = initLists(data.index)

  // オブジェクトごとにループ処理
  for await (const list of Object.keys(lists)) {
    await updateList({ data: data, user: user, lists: lists, list: list });
  }

  return lists;
};

/**********************************
 * 格納するオブジェクト
 **********************************/

const initLists = (index) => {
  return index === "companys"
    ? { posts: {},
        follows: [],
        home: [],
        likes: {},
        outputs: {},
        entries: {}
     }
    : index === "persoms" && {
        entries: [],
        likes: [],
        histories: [],
        follows: [],
        home: [],
        requests: {},
      };
};

/**********************************
 * リストを更新する処理
 **********************************/

const updateList = async ({ data, user, lists, list }) => {
  // array・objectかを判定
  if (Array.isArray(lists[list])) {
    // 配列がある場合
    if (user[list].length) {
      // ドキュメントを取得
      await updateFirestore({
        data: data,
        lists: lists,
        list: list,
      });
    }
  } else {
    for await (const i of Object.keys(user[list])) {
      // 配列がある場合
      if (user[list][i].length) {
        // ドキュメントを取得
        await updateFirestore({
          data: data,
          lists: lists,
          list: list,
          i: i,
        });
      }
    }
  }
};

/**********************************
 * Algolia 取得
 **********************************/

const fetchAlgolia = async ({ data, user, list, i }) => {
  const index = algolia.initIndex(
    list === "follows" || list === "home" || list === "requests"
      ? "companys"
      : data.index !== "persons"
      ? i
      : "matters"
  );

  // Algolia 存在している投稿かどうか判定
  const { results } = await index.getObjects(i ? user[list][i] : user[list]);
  return results.map((hit) => hit && hit.objectID);
};

/**********************************
 * Firestore 上書き保存
 **********************************/

const updateFirestore = async ({ data, user, lists, list, i }) => {
  // Algolia 存在している投稿かどうか判定
  const objectIDs = await fetchAlgolia({
    data: data,
    user: user,
    list: list,
    i: i,
  });

  // ドキュメントを取得
  const doc = await db.collection(data.index).doc(data.uid).get();

  // ドキュメントがあるかどうか判定
  if (doc.exists) {
    // 配列を定義
    const before = i ? doc.data()[list][i] : doc.data()[list];

    // 存在しない投稿を消して、新しい配列を作成
    const after = before.filter((objectID) => objectIDs.indexOf(objectID) > -1);

    // 新しい配列を格納オブジェクトに挿入
    Object.assign(i ? lists[list][i] : lists[list], ...after);

    // ドキュメントに上書き保存
    doc.ref
      .set(
        {
          [list]: i ? { [i]: [...after] } : [...after],
        },
        // 上書きを許可するかどうか
        { merge: true }
      )
      .catch((e) => {});
  }
};
