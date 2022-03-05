import * as functions from "firebase-functions";
import { db, location, runtime } from "../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../types/firestore";

type Data = Pick<Firestore.Data, "information" | "agree" | "maintenance"> & {
  index: "companys" | "persons";
};

export const editData = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);

    for await (const type of Object.keys(data)) {
      if (type !== "index") {
        const doc = await db
          .collection(data.index === "companys" ? "seshub" : "freelanceDirect")
          .doc(type)
          .get()
          .catch(() => {
            throw new functions.https.HttpsError(
              "not-found",
              "データの取得に失敗しました",
              "firebase"
            );
          });

        if (doc.exists) {
          data[
            <
              keyof Pick<
                Firestore.Data,
                "information" | "agree" | "maintenance"
              >
            >type
          ].updateAt = Date.now();

          await doc.ref
            .set(
              data[
                <
                  keyof Pick<
                    Firestore.Data,
                    "information" | "agree" | "maintenance"
                  >
                >type
              ],
              { merge: true }
            )
            .catch(() => {
              throw new functions.https.HttpsError(
                "data-loss",
                "データの更新に失敗しました",
                "firebase"
              );
            });
        }
      }
    }

    return data;
  });
