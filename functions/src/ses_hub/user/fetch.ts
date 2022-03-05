import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import { dummy } from "../../dummy";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";

type Data = {
  index: "companys" | "persons";
  uid?: string;
  uids?: string[];
};

export const fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    const status = await userAuthenticated({
      context: context,
      index: data.index,
      canceled: true,
      fetch: true,
    });

    const demo = checkDemo(context);
    const user = await fetchProfile(context, data, demo, status);
    const bests =
      data.index === "persons" &&
      (await fetchBests(user as Algolia.PersonItem, data));

    return { user: user, bests: bests };
  });

const fetchProfile = async (
  context: functions.https.CallableContext,
  data: Data,
  demo: boolean,
  status: boolean
): Promise<
  Algolia.CompanyItem | Algolia.PersonItem | Algolia.CompanyItem[] | undefined
> => {
  const user = await fetchAlgolia(data, demo, status);

  user && (await fetchFirestore(context, data, user));

  return user;
};

const fetchAlgolia = async (
  data: Data,
  demo: boolean,
  status: boolean
): Promise<
  Algolia.CompanyItem | Algolia.PersonItem | Algolia.CompanyItem[] | undefined
> => {
  const index = algolia.initIndex(data.index);

  if (data.uid) {
    const user = await index
      .getObject<Algolia.Company | Algolia.Person>(data.uid)
      .then((hit) => {
        return hit && data.index === "companys"
          ? status
            ? fetch.company.active(<Algolia.Company>hit, demo)
            : fetch.company.canceled(<Algolia.Company>hit, demo)
          : hit &&
              data.index === "persons" &&
              fetch.person(<Algolia.Person>hit, demo);
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          "not-found",
          "プロフィールの取得に失敗しました",
          "notFound"
        );
      });

    if (!user) {
      throw new functions.https.HttpsError(
        "not-found",
        "プロフィールの取得に失敗しました",
        "notFound"
      );
    }

    return user;
  }

  if (data.uids) {
    const user = await index
      .getObjects<Algolia.Company>(data.uids)
      .then(({ results }) => {
        return results.map(
          (hit) => hit && fetch.company.active(hit)
        ) as Algolia.CompanyItem[];
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          "not-found",
          "プロフィールの取得に失敗しました",
          "notFound"
        );
      });

    return user;
  }

  return;
};

const fetchFirestore = async (
  context: functions.https.CallableContext,
  data: Data,
  user: Algolia.CompanyItem | Algolia.PersonItem | Algolia.CompanyItem[]
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  if (data.uid) {
    const doc = await db
      .collection(data.index)
      .withConverter(converter<Firestore.Company | Firestore.Person>())
      .doc(data.uid)
      .get()
      .catch(() => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "notFound"
        );
      });

    if (doc.exists) {
      (user as Algolia.CompanyItem | Algolia.PersonItem).icon =
        doc.data()?.icon;
      (user as Algolia.CompanyItem | Algolia.PersonItem).cover =
        doc.data()?.cover;

      if (data.index === "companys") {
        const data = doc.data() as Firestore.Company;

        if (data.type !== "individual" && data.payment.status === "canceled") {
          throw new functions.https.HttpsError(
            "not-found",
            "ユーザーの取得に失敗しました",
            "notFound"
          );
        }
        (user as Algolia.CompanyItem).status = data.payment.status;
        (user as Algolia.CompanyItem).type = data.type;
      }

      if (data.index === "persons") {
        const data = doc.data() as Firestore.Person;
        const enable = data.requests.enable;
        const hold = data.requests.hold;
        const disable = data.requests.disable;

        const request =
          (enable as string[]).indexOf(context.auth.uid) >= 0
            ? "enable"
            : (hold as string[]).indexOf(context.auth.uid) >= 0
            ? "hold"
            : (disable as string[]).indexOf(context.auth.uid) >= 0
            ? "hold"
            : "none";

        if (request !== "enable") {
          (user as Algolia.PersonItem).profile.name = dummy.person();
          (user as Algolia.PersonItem).profile.email = dummy.email();
          (user as Algolia.PersonItem).profile.urls = dummy.urls(3);

          (user as Algolia.PersonItem).resume = null;
        } else {
          (user as Algolia.PersonItem).resume = data.resume.url;
        }

        (user as Algolia.PersonItem).request = request;
      }
    }
  }

  if (data.uids) {
    for (let i = 0; i < (user as Algolia.CompanyItem[]).length; i++) {
      if ((user as Algolia.CompanyItem[])[i]) {
        const doc = await db
          .collection(data.index)
          .withConverter(converter<Firestore.Company>())
          .doc((user as Algolia.CompanyItem[])[i].uid)
          .get()
          .catch(() => {
            throw new functions.https.HttpsError(
              "not-found",
              "ユーザーの取得に失敗しました",
              "firebase"
            );
          });

        if (doc.exists) {
          (user as Algolia.CompanyItem[])[i].icon = doc.data()?.icon;
          (user as Algolia.CompanyItem[])[i].cover = doc.data()?.cover;
          (user as Algolia.CompanyItem[])[i].type = doc.data()?.type;
        }
      }
    }
  }
};

const fetchBests = async (
  user: Algolia.PersonItem,
  data: Data
): Promise<(Algolia.PersonItem | undefined)[]> => {
  const index = algolia.initIndex("persons");

  const { hits } = await index
    .search<Algolia.Person>("", {
      queryLanguages: ["ja", "en"],
      similarQuery: user.profile.handles?.join(" "),
      filters: "status:enable",
      hitsPerPage: 100,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  const bests = hits?.map((hit) =>
    hit.objectID !== user.uid ? fetch.best(hit) : undefined
  );

  for (let i = 0; i < bests?.length; i++) {
    if (bests[i]) {
      const doc = await db
        .collection(data.index)
        .withConverter(converter<Firestore.Person>())
        .doc((bests[i] as Algolia.PersonItem).uid)
        .get()
        .catch(() => {
          throw new functions.https.HttpsError(
            "not-found",
            "ユーザーの取得に失敗しました",
            "firebase"
          );
        });

      if (doc.exists) {
        if (doc.data()?.profile.nickName) {
          (bests[i] as Algolia.PersonItem).icon = doc.data()?.icon;
        } else {
          bests[i] = undefined;
        }
      }
    }
  }

  return bests;
};

const checkDemo = (context: functions.https.CallableContext) =>
  context.auth?.uid === functions.config().demo.ses_hub.uid;
