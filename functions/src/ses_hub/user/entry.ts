import * as functions from "firebase-functions";
import { db, location, runtime, converter } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";

type Data = {
  index: "matters" | "resources" | "persons";
  objectID: string;
};

export const addEntry = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
    });

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
      const entries = doc.data()?.entries;

      if (
        entries?.[data.index] &&
        entries[data.index].indexOf(data.objectID) >= 0
      ) {
        throw new functions.https.HttpsError(
          "cancelled",
          "データが重複しているため、追加できません",
          "firebase"
        );
      }

      await doc.ref
        .set(
          {
            entries: Object.assign(
              entries,
              entries?.[data.index].length
                ? {
                    [data.index]: [data.objectID, ...entries[data.index]],
                  }
                : {
                    [data.index]: [data.objectID],
                  }
            ),
            updateAt: timestamp,
          },
          { merge: true }
        )
        .catch(() => {
          throw new functions.https.HttpsError(
            "data-loss",
            "エントリーの追加に失敗しました",
            "firebase"
          );
        });
    }

    return;
  });
