import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";

type Data = {
  index: "matters" | "resources" | "companys";
  uid: string;
  uids?: string[];
  display?: string | null;
  status?: string | null;
  page?: number;
};

export const userPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated({ context: context });

    const demo = checkDemo(context);

    const { posts, hit } = !data.uids
      ? await fetchPosts(context, data)
      : await fetchFollows(data, demo);

    posts?.length &&
      data.index === "companys" &&
      (await fetchFirestore(data, posts as Algolia.CompanyItem[]));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchPosts = async (
  context: functions.https.CallableContext,
  data: Data
): Promise<{
  posts: Algolia.Matter[] | Algolia.Resource[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex(data.index);

  const hit: Algolia.Hit = {
    currentPage: data.page ? data.page : 0,
  };

  const result = await index
    .search<Algolia.Matter | Algolia.Resource>(data.uid, {
      filters:
        data.uid !== context.auth?.uid
          ? "display:public"
          : data.display && data.status
          ? `display:${data.display} AND status:${data.status}`
          : data.display
          ? `display:${data.display}`
          : data.status
          ? `status:${data.status}`
          : "",
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

  const posts = result?.hits
    ?.map((hit) =>
      data.index === "matters" && hit.uid === context.auth?.uid
        ? fetch.auth.matter(<Algolia.Matter>hit)
        : data.index === "matters"
        ? fetch.other.matter(<Algolia.Matter>hit)
        : data.index === "resources" && hit.uid === context.auth?.uid
        ? fetch.auth.resource(<Algolia.Resource>hit)
        : data.index === "resources"
        ? fetch.other.resource(<Algolia.Resource>hit)
        : undefined
    )
    ?.filter((post) => post) as Algolia.Matter[] | Algolia.Resource[];

  return { posts, hit };
};

const fetchFollows = async (
  data: Data,
  demo: boolean
): Promise<{
  posts: Algolia.CompanyItem[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex(data.index);

  const hitsPerPage = 50;

  const hit: Algolia.Hit = {
    posts: data.uids?.length,
    pages: data.uids?.length && Math.ceil(data.uids.length / 50),
    currentPage: data.page ? data.page : 0,
  };

  const { results } = await index
    .getObjects<Algolia.Company>(
      data.uids?.length
        ? data.uids.slice(
            hit.currentPage * hitsPerPage,
            hitsPerPage * (hit.currentPage + 1)
          )
        : []
    )
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  const posts = results
    ?.map((hit) =>
      hit && hit.status === "enable"
        ? fetch.other.company(hit, demo)
        : undefined
    )
    ?.filter((post) => post) as Algolia.CompanyItem[];

  return { posts, hit };
};

const fetchFirestore = async (
  data: Data,
  posts: Algolia.CompanyItem[]
): Promise<void> => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i]) {
      const doc = await db
        .collection(data.index)
        .withConverter(converter<Firestore.Company>())
        .doc(posts[i].uid)
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
          posts[i].icon = "none";
          posts[i].status = "none";
          posts[i].type = "none";
          posts[i].profile = {
            name: undefined,
            person: "存在しないユーザー",
            body: undefined,
          };
        } else {
          posts[i].icon = doc.data()?.icon;
          posts[i].type = doc.data()?.type;
        }
      }
    }
  }
};

const checkDemo = (context: functions.https.CallableContext): boolean =>
  context.auth?.uid === functions.config().demo.ses_hub.uid;
