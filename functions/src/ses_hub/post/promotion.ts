import * as functions from "firebase-functions";
import { location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import * as fetch from "./_fetch";
import * as Algolia from "../../types/algolia";
import { Hit } from "@algolia/client-search";

export const promotionPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: "matters" | "resources") => {
    const index = algolia.initIndex(data);

    const result = await index
      .search<Algolia.Matter | Algolia.Resource>("", {
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

    const posts = result?.hits?.map((hit) =>
      data === "matters"
        ? fetch.promotion.matter(hit as Hit<Algolia.Matter>)
        : fetch.promotion.resource(hit as Hit<Algolia.Resource>)
    );

    return { index: data, posts: posts };
  });
