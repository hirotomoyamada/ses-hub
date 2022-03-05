import * as firestore from "@google-cloud/firestore";
import * as functions from "firebase-functions";
import { location, runtime, timeZone } from "../firebase";
const client = new firestore.v1.FirestoreAdminClient();

type i = "companys" | "persons" | "customers";

export const companys = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun(async () => saveBucket("companys"));

export const persons = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun(async () => saveBucket("persons"));

export const customers = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun(async () => saveBucket("customers"));

const saveBucket = async (i: i) => {
  const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;

  if (!projectId) {
    throw new functions.https.HttpsError(
      "data-loss",
      "プロジェクトIDが存在しません",
      "projectId"
    );
  }

  const databaseName = client.databasePath(projectId, "(default)");
  const bucket = `gs://${functions.config().storage[i]}`;

  const responses = await client.exportDocuments({
    name: databaseName,
    outputUriPrefix: bucket,
    collectionIds: [i],
  });

  const response = responses[0];

  return response;
};
