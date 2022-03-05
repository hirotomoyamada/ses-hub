import * as functions from "firebase-functions";
import { location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import * as fetch from "./_fetch";
import * as Algolia from "../../types/algolia";

export const promotionPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string) => {
    const index = algolia.initIndex("matters");

    const result = await index
      .search<Algolia.Matter>(data, {
        filters: "display:public",
        hitsPerPage: 8,
      })
      .catch(() => {
        throw new functions.https.HttpsError(
          "not-found",
          "投稿の取得に失敗しました",
          "algolia"
        );
      });

    const posts = result?.hits.map((hit) => fetch.promotion(hit));

    return posts;
  });
