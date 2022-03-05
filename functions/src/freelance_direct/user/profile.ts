import * as functions from "firebase-functions";
import { converter, db, location, runtime, storage } from "../../firebase";
import { algolia } from "../../algolia";
import * as format from "./_format";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";
import { userAuthenticated } from "./_userAuthenticated";

export type Data = {
  create: {
    name: string;
    age: number;
    sex: string;
    position: string;
    location: string;
    handles: string[];
    file: string;
    type: string;
    agree: string;
    provider: string;
    fetch: boolean;
  };
  edit: {
    icon: string;
    cover: string;
    nickName: string;
    position: string;
    body: string | null;
    age: number;
    sex: string;
    location: string;
    period: {
      year: number | null;
      month: number | null;
    };
    costs: {
      display: "public" | "private";
      type: string;
      min: number | null;
      max: number | null;
    };
    handles: string[];
    tools: string[] | [];
    skills: string[] | [];
    urls: string[] | [];
    clothes: string | null;
    working: number | null;
    resident: string | null;
    uid?: string;
  };
};

export const createProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data["create"], context) => {
    const file = await uploadFile(data.file, data.type, context.auth?.uid);

    await createFirestore(context, data, file);
    await createAlgolia(context, data);

    return { displayName: data.name };
  });

export const editProfile = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data["edit"], context) => {
    await userAuthenticated({ context: context, demo: true });

    if (context.auth?.uid === data.uid) {
      await editFirestore(context, data);
      await editAlgolia(context, data);

      return;
    }
  });

export const changeState = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({ context: context, demo: true });

    await editFirestore(context, data);
    await editAlgolia(context, data);

    return;
  });

const uploadFile = async (
  file: string,
  type: string,
  uid?: string
): Promise<{
  key: string;
  url: string;
}> => {
  if (!uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  if (file.length > 0.4 * 1024 * 1024) {
    throw new functions.https.HttpsError(
      "cancelled",
      "アップロードするファイルの容量が大きすぎます",
      "storage"
    );
  }

  if (type !== "application/pdf") {
    throw new functions.https.HttpsError(
      "cancelled",
      "アップロードするファイルがpdf形式ではありません",
      "storage"
    );
  }

  const key = `${uid}-${Math.random().toString(32).substring(2)}`;

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
      await path.makePublic();

      return path.publicUrl();
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "アップロードに失敗しました\npdfのみアップロードできます",
        "storage"
      );
    });

  return { key: key, url: url };
};

const createFirestore = async (
  context: functions.https.CallableContext,
  data: Data["create"],
  file: { key: string; url: string }
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("persons")
    .withConverter(converter<Firestore.Person>())
    .doc(context.auth.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  const profile = format.createFirestore({
    context: context,
    data: data,
    file: file,
  });

  if (!profile) {
    throw new functions.https.HttpsError(
      "data-loss",
      "プロフィールの作成に失敗しました",
      "algolia"
    );
  }

  if (!doc.exists) {
    await doc.ref.set(profile).catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの作成に失敗しました",
        "firebase"
      );
    });
  }
};

const editFirestore = async (
  context: functions.https.CallableContext,
  data: Data["edit"] | string
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  const doc = await db
    .collection("persons")
    .withConverter(converter<Firestore.Person>())
    .doc(context.auth.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  const state = typeof data === "string";

  const profile = !state
    ? format.editFirestore({
        context: context,
        data: data as Data["edit"],
        doc: doc,
      })
    : {
        profile: Object.assign(doc.data()?.profile, {
          state: data,
        }),
        updateAt: timestamp,
      };

  if (doc.exists && profile) {
    await doc.ref.set(profile, { merge: true }).catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "firebase"
      );
    });
  }
};

const createAlgolia = async (
  context: functions.https.CallableContext,
  data: Data["create"]
): Promise<void> => {
  const index = algolia.initIndex("persons");

  const profile: Algolia.Person = format.createAlgolia({
    context: context,
    data: data,
  });

  if (!profile) {
    throw new functions.https.HttpsError(
      "data-loss",
      "プロフィールの作成に失敗しました",
      "algolia"
    );
  }

  await index
    .partialUpdateObject(profile, {
      createIfNotExists: true,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの作成に失敗しました",
        "algolia"
      );
    });
};

const editAlgolia = async (
  context: functions.https.CallableContext,
  data: Data["edit"] | string
): Promise<void> => {
  const timestamp = Date.now();
  const index = algolia.initIndex("persons");

  const state = typeof data === "string";

  const profile = !state
    ? format.editAlgolia({
        context: context,
        data: data as Data["edit"],
      })
    : {
        objectID: context.auth?.uid,
        state: data,
        updateAt: timestamp,
      };

  if (!profile) {
    throw new functions.https.HttpsError(
      "data-loss",
      "プロフィールの作成に失敗しました",
      "algolia"
    );
  }

  await index
    .partialUpdateObject(profile, {
      createIfNotExists: true,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "algolia"
      );
    });
};
