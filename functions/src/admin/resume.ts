import * as functions from "firebase-functions";
import { db, storage, location, runtime, converter } from "../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../types/firestore";

const timestamp = Date.now();

type Data = {
  uid: string;
  file: string;
};

export const uploadResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);

    if (data.file.length > 0.4 * 1024 * 1024) {
      throw new functions.https.HttpsError(
        "cancelled",
        "容量が大きすぎます",
        "storage"
      );
    }

    const doc = await fetchDoc(data.uid);

    const url = doc.exists && (await uploadFile(data.file, doc, data.uid));

    return url;
  });

export const deleteResume = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated(context);

    const doc = await fetchDoc(data);

    doc.exists && (await deleteFile(doc));

    return;
  });

const fetchDoc = async (
  uid: string
): Promise<FirebaseFirestore.DocumentSnapshot<Firestore.Person>> => {
  const doc = await db
    .collection("persons")
    .withConverter(converter<Firestore.Person>())
    .doc(uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return doc;
};

const uploadFile = async (
  file: string,
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Person>,
  uid: string
): Promise<string> => {
  const resume = doc.data()?.resume;

  if (!resume) {
    throw new functions.https.HttpsError(
      "not-found",
      "ユーザーの取得に失敗しました",
      "firebase"
    );
  }

  const key = resume.key
    ? resume.key
    : `${uid}-${Math.random().toString(32).substring(2)}`;

  const name = `${key}.pdf`;
  const bucket = storage.bucket(functions.config().storage.resume);
  const buffer = Buffer.from(file, "base64");
  const path = bucket.file(name);

  const url = await path
    .save(buffer, {
      metadata: {
        contentType: "application/pdf",
      },
    })
    .then(async () => {
      const url = await path.makePublic().then(() => {
        return path.publicUrl();
      });

      await updateFirestore(doc, key, url);

      return url;
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ファイルの作成に失敗しました",
        "storage"
      );
    });

  return url;
};

const deleteFile = async (
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Person>
): Promise<void> => {
  const key = doc.data()?.resume.key;

  if (!key) {
    throw new functions.https.HttpsError(
      "cancelled",
      "データが無いため、処理中止",
      "firebase"
    );
  }

  const name = `${key}.pdf`;

  const bucket = storage.bucket(functions.config().storage.resume);

  const path = bucket.file(name);

  await path
    .delete()
    .then(async () => {
      await updateFirestore(doc);
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ファイルの削除に失敗しました",
        "storage"
      );
    });
};

const updateFirestore = async (
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Person>,
  key?: string,
  url?: string
): Promise<void> => {
  await doc.ref
    .set(
      {
        resume: key && url ? { key: key, url: url } : { key: "", url: "" },
        updateAt: timestamp,
      },
      { merge: true }
    )
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "firebase"
      );
    });
};
