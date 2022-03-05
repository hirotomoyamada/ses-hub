import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../types/firestore";

type Auth = {
  uid: string;
  seshub: {
    [key in string]: Firestore.Data | boolean;
  };
  freelanceDirect: {
    [key in string]: Firestore.Data | boolean;
  };
};

export const login = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (_data: unknown, context) => {
    await userAuthenticated(context);

    const auth = await fetchCollection(context);

    return auth;
  });

const fetchCollection = async (context: functions.https.CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const auth: Auth = {
    uid: context.auth.uid,
    seshub: {
      application: false,
      hold: false,
    },
    freelanceDirect: {
      hold: false,
    },
  };

  for await (const index of Object.keys(auth)) {
    if (index !== "uid") {
      const docs = await db
        .collection(index)
        .withConverter(converter<Firestore.Data>())
        .get()
        .catch(() => {
          throw new functions.https.HttpsError(
            "not-found",
            "データの取得に失敗しました",
            "firebase"
          );
        });

      for await (const key of Object.keys(auth[index as keyof Auth])) {
        const collection = await db
          .collection(index === "seshub" ? "companys" : "persons")
          .withConverter(converter<Firestore.Company | Firestore.Person>())
          .where(
            key === "application" ? key : "status",
            "==",
            key === "application" ? true : key
          )
          .orderBy("lastLogin", "desc")
          .get();

        if (collection?.docs?.length) {
          Object.assign(auth[index as keyof Auth], { [key]: true });
        }
      }

      docs.forEach((doc) => {
        Object.assign(auth[index as keyof Auth], { [doc.id]: doc.data() });
      });
    }
  }

  return auth;
};
