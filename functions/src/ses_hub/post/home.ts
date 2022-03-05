import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { dummy } from "../../dummy";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";

type Data = {
  index: "matters" | "resources";
  follows: string[];
  page?: number;
};

export const homePosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    const status = await userAuthenticated({
      context: context,
      canceled: true,
    });

    const demo = checkDemo(context);

    const { posts, hit } = await fetchAlgolia(context, data, status);

    posts?.length && (await fetchFiretore(posts, demo));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (
  context: functions.https.CallableContext,
  data: Data,
  status: boolean
): Promise<{
  posts: (Algolia.Matter | undefined)[] | (Algolia.Resource | undefined)[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex(data.index);
  const value = [context.auth?.uid, ...data.follows].join(" ");

  const hit: Algolia.Hit = {
    currentPage: data.page ? data.page : 0,
  };

  const result = await index
    .search<Algolia.Matter | Algolia.Resource>("", {
      queryLanguages: ["ja", "en"],
      similarQuery: value,
      filters: "display:public",
      page: hit.currentPage,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  hit.posts = result?.nbHits;
  hit.pages = result?.nbPages;

  const posts = result?.hits?.map((hit) =>
    hit && data.index === "matters" && hit.uid === context.auth?.uid
      ? fetch.auth.matter(<Algolia.Matter>hit)
      : hit && data.index === "matters" && status
      ? fetch.other.matter(<Algolia.Matter>hit)
      : hit && data.index === "resources" && hit.uid === context.auth?.uid
      ? fetch.auth.resource(<Algolia.Resource>hit)
      : hit && data.index === "resources" && status
      ? fetch.other.resource(<Algolia.Resource>hit)
      : undefined
  ) as (Algolia.Matter | undefined)[] | (Algolia.Resource | undefined)[];

  return { posts, hit };
};

const fetchFiretore = async (
  posts: (Algolia.Matter | undefined)[] | (Algolia.Resource | undefined)[],
  demo: boolean
): Promise<void> => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i]) {
      const doc = await db
        .collection("companys")
        .withConverter(converter<Firestore.Company>())
        .doc((posts as Algolia.Matter[] | Algolia.Resource[])[i].uid)
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
          doc.data()?.type !== "individual" &&
          doc.data()?.payment.status === "canceled"
        ) {
          posts[i] = undefined;
        } else {
          (posts as Algolia.Matter[] | Algolia.Resource[])[i].user = {
            type: doc.data()?.type,
            profile: {
              name: !demo ? doc.data()?.profile.name : dummy.name(),
              person: !demo ? doc.data()?.profile.person : dummy.person(),
            },
          };
        }
      } else {
        posts[i] = undefined;
      }
    }
  }
};

const checkDemo = (context: functions.https.CallableContext): boolean => {
  return context.auth?.uid === functions.config().demo.ses_hub.uid;
};
