import * as functions from "firebase-functions";
import { storage, location, runtime, timeZone } from "../firebase";
import { algolia } from "../algolia";

type i = "matters" | "resources" | "companys" | "persons";

export const matters = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun(async () => saveBucket("matters"));

export const resources = functions
  .region(location)
  .runWith(runtime)
  .pubsub.schedule("0 0 * * *")
  .timeZone(timeZone)
  .onRun(async () => saveBucket("resources"));

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

const encodeJson = async (i: i): Promise<string> => {
  let json: string | null = null;

  const index = algolia.initIndex(i);

  await index.browseObjects({
    batch: (t) => {
      json = JSON.stringify(t, null, 2);
    },
  });

  if (!json) {
    throw new functions.https.HttpsError(
      "data-loss",
      "データが存在しません",
      "json"
    );
  }

  return json;
};

const timestamp = () => {
  const unix = new Date(Date.now());
  const year = unix.getFullYear();
  const month = ("0" + (unix.getMonth() + 1)).slice(-2);
  const date = ("0" + unix.getDate()).slice(-2);
  const hours = ("0" + unix.getHours()).slice(-2);
  const minutes = ("0" + unix.getMinutes()).slice(-2);
  const seconds = ("0" + unix.getSeconds()).slice(-2);

  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;
};

const saveBucket = async (i: i): Promise<void> => {
  const path = `${i}/${timestamp()}.json`;
  const bucket = storage.bucket(functions.config().storage.posts).file(path);

  const json = await encodeJson(i);

  await bucket.save(json);
};
