import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Algolia from "../../types/algolia";
import * as Firestore from "../../types/firestore";

type Data = { index: "matters" | "companys"; follows: string[]; page?: number };

type Posts = Algolia.Matter | Algolia.CompanyItem;

export const homePosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);
    const demo = checkDemo(context);

    const { posts, hit } = await fetchAlgolia(context, data, demo);

    posts.length && (await fetchFirestore(data, posts, demo));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (
  context: functions.https.CallableContext,
  data: Data,
  demo: boolean
): Promise<{
  posts: Posts[];
  hit: Algolia.Hit;
}> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const index = algolia.initIndex(data.index);
  const value =
    data.index === "matters"
      ? [context.auth.uid, ...data.follows].join(" ")
      : undefined;

  const hitsPerPage = 50;

  const hit: Algolia.Hit =
    data.index === "matters"
      ? {
          currentPage: data.page ? data.page : 0,
        }
      : {
          posts: data.follows.length,
          pages: Math.ceil(data.follows.length / 50),
          currentPage: data.page ? data.page : 0,
        };

  if (data.index === "matters") {
    const results = await index
      .search<Algolia.Matter>("", {
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

    hit.posts = results?.nbHits;
    hit.pages = results?.nbPages;

    const posts = results?.hits
      .map((hit) => hit && fetch.matter(hit))
      ?.filter((post) => post);

    return { posts, hit };
  } else {
    const { results } = await index
      .getObjects<Algolia.Company>(
        data.follows.slice(
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

    const posts = results
      ?.map((hit) => hit?.status === "enable" && fetch.company.item(hit, demo))
      ?.filter((post) => post) as Algolia.CompanyItem[];

    return { posts, hit };
  }
};

const fetchFirestore = async (
  data: Data,
  posts: Posts[],
  demo: boolean
): Promise<void> => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i]) {
      const doc = await db
        .collection("companys")
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
        if (data.index === "matters") {
          if (
            doc.data()?.payment.status === "canceled" ||
            !doc.data()?.payment.option?.freelanceDirect
          ) {
            (posts as Algolia.Matter[])[i].user = fetch.company.none();
          } else {
            (posts as Algolia.Matter[])[i].user = fetch.company.supplementary(
              doc,
              demo
            );
          }
        } else {
          if (
            doc.data()?.payment.status === "canceled" ||
            !doc.data()?.payment.option?.freelanceDirect
          ) {
            (posts as Algolia.CompanyItem[])[i].icon = "none";
            (posts as Algolia.CompanyItem[])[i].type = "none";
            (posts as Algolia.CompanyItem[])[i].profile = {
              name: undefined,
              person: "存在しないユーザー",
              body: undefined,
            };
          } else {
            (posts as Algolia.CompanyItem[])[i].icon = doc.data()?.icon;
            (posts as Algolia.CompanyItem[])[i].type = doc.data()?.type;
          }
        }
      }
    }
  }
};

const checkDemo = (context: functions.https.CallableContext): boolean =>
  context.auth?.uid === functions.config().demo.freelance_direct.uid;
