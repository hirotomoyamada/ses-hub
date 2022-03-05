import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";

type Data = {
  uid: string;
  page?: number;
};

export const userPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);

    await checkUser(data);

    const { posts, hit } = await fetchAlgolia(data);

    return { posts: posts, hit: hit };
  });

const checkUser = async (data: Data): Promise<void> => {
  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(data.uid)
    .get();

  if (
    doc.data()?.payment.status === "canceled" ||
    !doc.data()?.payment.option?.freelanceDirect
  ) {
    throw new functions.https.HttpsError(
      "cancelled",
      "オプション未加入のユーザーのため、処理中止",
      "firebase"
    );
  }
};

const fetchAlgolia = async (
  data: Data
): Promise<{
  posts: Algolia.Matter[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex("matters");

  const hit: Algolia.Hit = {
    currentPage: data.page ? data.page : 0,
  };

  const result = await index
    .search<Algolia.Matter>(data.uid, {
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

  const posts = result?.hits.map((hit) => hit && fetch.matter(hit));

  return { posts, hit };
};
