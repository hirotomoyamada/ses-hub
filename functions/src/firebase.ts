import * as admin from "firebase-admin";
import { RuntimeOptions } from "firebase-functions";

admin.initializeApp();

export const location = "asia-northeast1";
export const runtime: RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "1GB",
};

export const timeZone = "Asia/Tokyo";

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();

export const converter = <T>(): admin.firestore.FirestoreDataConverter<T> => {
  return {
    toFirestore: (doc: T) => doc,
    fromFirestore: (snapshot: admin.firestore.QueryDocumentSnapshot<T>) =>
      snapshot.data() as T,
  };
};
