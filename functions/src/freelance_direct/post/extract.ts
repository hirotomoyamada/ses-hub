import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Algolia from "../../types/algolia";
import * as Firestore from "../../types/firestore";

type Data = {
  index: "matters" | "companys" | "enable" | "hold" | "disable";
  type: "likes" | "entries" | "requests" | "histories";
  objectIDs: string[];
  page?: number;
};

type Posts = Algolia.Matter | Algolia.Company;

type Results = Algolia.Matter | Algolia.CompanyItem;

export const extractPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);
    const demo = checkDemo(context);

    const { posts, hit } = await fetchAlgolia(data, demo);

    posts.length && (await fetchFirestore(data, posts));

    return { index: data.index, type: data.type, posts: posts, hit: hit };
  });

const fetchAlgolia = async (
  data: Data,
  demo: boolean
): Promise<{
  posts: Results[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex(
    data.type !== "requests" ? "matters" : "companys"
  );

  const objectIDs = data.objectIDs;

  const hitsPerPage = 50;

  const hit: Algolia.Hit = {
    posts: objectIDs.length,
    pages: Math.ceil(objectIDs.length / 50),
    currentPage: data.page ? data.page : 0,
  };

  const { results } = await index
    .getObjects<Posts>(
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

  const posts = results
    ?.map((hit) =>
      hit &&
      data.index === "matters" &&
      (hit as Algolia.Matter).display === "public"
        ? fetch.matter(<Algolia.Matter>hit)
        : hit &&
          data.type === "requests" &&
          hit.status === "enable" &&
          fetch.company.item(<Algolia.Company>hit, demo)
    )
    ?.filter((post) => post) as Results[];

  return { posts, hit };
};

const fetchFirestore = async (data: Data, posts: Results[]): Promise<void> => {
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
            !doc.data()?.payment.option &&
            !doc.data()?.payment.option?.freelanceDirect
          ) {
            (posts as Algolia.Matter[])[i].costs.display = "private";
            (posts as Algolia.Matter[])[i].costs.type = "応談";
            (posts as Algolia.Matter[])[i].costs.min = 0;
            (posts as Algolia.Matter[])[i].costs.max = 0;
          }
        }

        if (data.type === "requests") {
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
