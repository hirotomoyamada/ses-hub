import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";

type Data = {
  index: "matters" | "resources";
  objectID: string;
  objectIDs?: string;
};

export const addOutput = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateFirestore({ context: context, data: data, add: true });

    return;
  });

export const removeOutput = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateFirestore({ context: context, data: data });

    return;
  });

const updateFirestore = async ({
  context,
  data,
  add,
}: {
  context: functions.https.CallableContext;
  data: Data;
  add?: boolean;
}): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(context.auth.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const outputs = add
      ? doc.data()?.outputs?.[data.index]
      : !data.objectIDs
      ? doc
          .data()
          ?.outputs[data.index].filter((objectID) => objectID !== data.objectID)
      : doc
          .data()
          ?.outputs[data.index].filter(
            (objectID) => data.objectIDs?.indexOf(objectID) === -1
          );

    if ((outputs as string[]).indexOf(data.objectID) >= 0) {
      throw new functions.https.HttpsError(
        "cancelled",
        "データが重複しているため、追加できません",
        "firebase"
      );
    }

    await doc.ref
      .set(
        {
          outputs: Object.assign(doc.data()?.outputs, {
            [data.index]: add
              ? outputs?.length
                ? [data.objectID, ...outputs]
                : [data.objectID]
              : [...(outputs as string[])],
          }),
          updateAt: timestamp,
        },
        { merge: true }
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          add ? "出力の追加に失敗しました" : "出力の削除に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
