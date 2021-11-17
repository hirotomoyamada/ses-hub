const functions = require("firebase-functions");
const storage = require("../../firebase").storage;
const algolia = require("../../algolia").algolia;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const timeZone = require("../../firebase").timeZone;

const timestamp = require("./functions/timestamp").timestamp;

/**********************************
 * Algolia 案件 バックアップ
 **********************************/

exports.matters = functions
  .region(location)
  .runWith(runtime)
  // 毎日24時に実行する
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun(async (context) => {
    const target = "matters";

    const index = await algolia.initIndex(target);
    
    // ファイル名を定義
    const path = `${target}/${timestamp()}.json`;

    // ファイルを保存する先を定義
    const bucket = storage.bucket(functions.config().storage.posts).file(path);

    // 取得したオブジェクトを格納しておくオブジェクト
    let json = [];

    // Algoliaからエクスポート
    await index.browseObjects({
      batch: (objects) => {
        json = JSON.stringify(objects, null, 2);
      },
    });

    // 指定したバケットへオブジェクトを保存
    await bucket.save(json);
  });
