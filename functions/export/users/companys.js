const functions = require("firebase-functions");
const firestore = require("@google-cloud/firestore");
const client = new firestore.v1.FirestoreAdminClient();
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;
const timeZone = require("../../firebase").timeZone;

const bucket = `gs://${functions.config().storage.companys}`;

exports.companys = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun((context) => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = client.databasePath(projectId, "(default)");

    return client
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        collectionIds: ["companys"],
      })
      .then((responses) => {
        const response = responses[0];
        return response;
      });
  });
