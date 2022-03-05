import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Algolia from "../../types/algolia";
import * as Firestore from "../../types/firestore";

export const fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated({ context: context });

    const demo = checkDemo(context);
    const user = await fetchAlgolia(data, demo);
    await fetchFirestore(data, user);

    return user;
  });

const fetchAlgolia = async (
  data: string,
  demo: boolean
): Promise<Algolia.CompanyItem> => {
  const index = algolia.initIndex("companys");

  const hit = await index.getObject<Algolia.Company>(data).catch(() => {
    throw new functions.https.HttpsError(
      "not-found",
      "プロフィールの取得に失敗しました",
      "algolia"
    );
  });

  const user = fetch.company(hit, demo);

  if (!user) {
    throw new functions.https.HttpsError(
      "not-found",
      "プロフィールの取得に失敗しました",
      "algolia"
    );
  }

  return user;
};

const fetchFirestore = async (
  data: string,
  user: Algolia.CompanyItem
): Promise<void> => {
  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(data)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    if (
      doc.data()?.payment.status === "canceled" ||
      !doc.data()?.payment.option?.freelanceDirect
    ) {
      throw new functions.https.HttpsError(
        "cancelled",
        "オプション未加入のユーザーのため、処理中止",
        "firebase"
      );
    } else {
      user.icon = doc.data()?.icon;
      user.cover = doc.data()?.cover;
      user.type = doc.data()?.type;
    }
  }
};

const checkDemo = (context: functions.https.CallableContext): boolean =>
  context.auth?.uid === functions.config().demo.freelance_direct.uid;
