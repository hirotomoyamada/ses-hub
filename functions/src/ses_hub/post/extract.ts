import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Algolia from "../../types/algolia";
import * as Firestore from "../../types/firestore";

type Data = {
  index: "matters" | "resources" | "persons";
  type: "likes" | "outputs" | "entries";
  objectIDs: string[];
  page?: number;
};

export const extractPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated({
      context: context,
      index: data.index,
      type: data.type,
      canceled: true,
    });

    const demo = checkDemo(context);

    const { posts, hit } = await fetchAlgolia(context, data, status, demo);

    posts?.length && (await fetchFirestore(context, data, posts));

    return { index: data.index, type: data.type, posts: posts, hit: hit };
  });

const fetchAlgolia = async (
  context: functions.https.CallableContext,
  data: Data,
  status: boolean,
  demo: boolean
): Promise<{
  posts: (Algolia.Matter | Algolia.Resource | Algolia.PersonItem | undefined)[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex(data.index);

  const objectIDs = data.objectIDs;

  const hitsPerPage = 50;

  const hit: Algolia.Hit = {
    posts: objectIDs.length,
    pages: Math.ceil(objectIDs.length / 50),
    currentPage: data.page ? data.page : 0,
  };

  const { results } = await index
    .getObjects<Algolia.Matter | Algolia.Resource | Algolia.Person>(
      objectIDs.slice(
        hit.currentPage * hitsPerPage,
        hitsPerPage * (hit.currentPage + 1)
      )
    )
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  const posts = results?.map((hit) =>
    hit && data.index === "matters" && hit.uid === context.auth?.uid
      ? fetch.auth.matter(<Algolia.Matter>hit)
      : hit &&
        data.index === "matters" &&
        (hit as Algolia.Matter).display === "public" &&
        status
      ? fetch.other.matter(<Algolia.Matter>hit)
      : hit && data.index === "resources" && hit.uid === context.auth?.uid
      ? fetch.auth.resource(<Algolia.Resource>hit)
      : hit &&
        data.index === "resources" &&
        (hit as Algolia.Resource).display === "public" &&
        status
      ? fetch.auth.resource(<Algolia.Resource>hit)
      : hit && data.index === "persons" && hit.status === "enable" && status
      ? fetch.other.person(<Algolia.Person>hit)
      : undefined
  );

  return { posts, hit };
};

const fetchFirestore = async (
  context: functions.https.CallableContext,
  data: Data,
  posts: (Algolia.Matter | Algolia.Resource | Algolia.PersonItem | undefined)[]
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  for (let i = 0; i < posts.length; i++) {
    if (posts[i]) {
      const doc = await db
        .collection(
          data.index === "matters" || data.index === "resources"
            ? "companys"
            : data.index
        )
        .withConverter(converter<Firestore.Company | Firestore.Person>())
        .doc(
          (posts as (Algolia.Matter | Algolia.Resource | Algolia.PersonItem)[])[
            i
          ].uid
        )
        .get()
        .catch(() => {
          throw new functions.https.HttpsError(
            "not-found",
            "ユーザーの取得に失敗しました",
            "firebase"
          );
        });

      if (doc.exists) {
        switch (data.index) {
          case "matters":
          case "resources":
            {
              const data = doc.data() as Firestore.Company;

              if (
                data.type !== "individual" &&
                data.payment.status === "canceled"
              ) {
                posts[i] = undefined;
              }
            }
            break;
          case "persons":
            {
              const data = doc.data() as Firestore.Person;

              if (data.profile.nickName) {
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

                (posts as Algolia.PersonItem[])[i].icon = data.icon;
                (posts as Algolia.PersonItem[])[i].request = request;
              } else {
                posts[i] = undefined;
              }
            }
            break;
          default:
            return;
        }
      }
    }
  }
};

const checkDemo = (context: functions.https.CallableContext): boolean =>
  context.auth?.uid === functions.config().demo.ses_hub.uid;
