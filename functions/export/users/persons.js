const functions = require("firebase-functions");
const firestore = require("@google-cloud/firestore");
const client = new firestore.v1.FirestoreAdminClient();
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const timeZone = require("../../firebase").timeZone;

const bucket = `gs://${functions.config().storage.persons}`;

/**********************************
 * Firestore エンジニア バックアップ
 **********************************/

exports.persons = functions
  .region(location)
  .runWith(runtime)
  // 毎日24時に実行する
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun((context) => {
    // エクスポートする Firestore を定義
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = client.databasePath(projectId, "(default)");

    // Firestoreからエクスポートして、Firestorageに保存
    return client
      .exportDocuments({
        name: databaseName,
        // ファイルを保存する先
        outputUriPrefix: bucket,
        // エクスポートするコレクション
        collectionIds: ["persons"],
      })
      .then((responses) => {
        const response = responses[0];
        return response;
      });
  });
