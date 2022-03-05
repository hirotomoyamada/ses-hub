import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../firebase";
import { algolia } from "../algolia";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../types/firestore";

type Data = {
  uid: string;
  status: string;
  account?: number;
  option?: string;
}[];

export const updateAccount = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);

    for await (const user of data) {
      const children = await updateFirestore(user);
      await updateAlgolia(user);

      if (children?.length) {
        for await (const child of children) {
          await updateFirestore(user, child);
          await updateAlgolia(user, child);
        }
      }
    }

    return data;
  });

const updateFirestore = async (
  user: Data[number],
  child?: string
): Promise<string[] | undefined> => {
  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(!child ? user?.uid : child)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  const parent = doc.data()?.type === "parent";
  const payment = doc.data()?.payment;

  if (!payment) {
    throw new functions.https.HttpsError(
      "not-found",
      "ユーザーの取得に失敗しました",
      "firebase"
    );
  }

  const children = payment.children;

  const status = !parent
    ? {
        status: user?.status,
      }
    : !children
    ? {
        status: user?.status,
        account: !user?.account ? 0 : user?.account,
        children: [],
      }
    : {
        status: user?.status,
        account: !user?.account ? 0 : user?.account,
      };

  const option = !parent
    ? {
        status: user?.status,
        option: {
          freelanceDirect: user?.option === "enable" ? true : false,
        },
      }
    : !children
    ? {
        status: user?.status,
        option: {
          freelanceDirect: user?.option === "enable" ? true : false,
        },
        account: !user?.account ? 0 : user?.account,
        children: [],
      }
    : {
        status: user?.status,
        option: {
          freelanceDirect: user?.option === "enable" ? true : false,
        },
        account: !user?.account ? 0 : user?.account,
      };

  await doc.ref
    .set(
      { payment: Object.assign(payment, !user?.option ? status : option) },
      {
        merge: true,
      }
    )
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ユーザーの編集に失敗しました",
        "firebase"
      );
    });

  return children;
};

const updateAlgolia = async (
  user: Data[number],
  child?: string
): Promise<void> => {
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject(
      user.option
        ? {
            objectID: !child ? user?.uid : child,
            plan: user?.status !== "canceled" ? "enable" : "disable",
            freelanceDirect: user?.option,
          }
        : {
            objectID: user?.uid,
            plan: user?.status !== "canceled" ? "enable" : "disable",
          },
      {
        createIfNotExists: false,
      }
    )
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ユーザーの編集に失敗しました",
        "algolia"
      );
    });
};
