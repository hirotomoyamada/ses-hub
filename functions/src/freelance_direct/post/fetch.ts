import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Algolia from "../../types/algolia";
import * as Firestore from "../../types/firestore";

type Data = {
  index: "matters" | "companys";
  target: string | null;
  value: string | null;
  type: string | null;
  page?: number;
};

type Result = Algolia.Matter | Algolia.CompanyItem;

export const fetchPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: string, context) => {
    await userAuthenticated(context);
    const demo = checkDemo(context);

    const post = await fetchAlgolia(data, demo);
    const bests = await fetchBests(post);

    !demo && (await addHistory(context, data));

    return { post: post, bests: bests };
  });

export const fetchPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);
    const demo = checkDemo(context);

    const { posts, hit } = await fetchSearchAlgolia(data, demo);

    await fetchQueryFirestore(data, posts);

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (
  data: string,
  demo: boolean
): Promise<Algolia.Matter> => {
  const index = algolia.initIndex("matters");

  const hit = await index.getObject<Algolia.Matter>(data).catch(() => {
    throw new functions.https.HttpsError(
      "not-found",
      "投稿の取得に失敗しました",
      "notFound"
    );
  });

  const post = hit.display === "public" && fetch.matter(hit);

  if (!post) {
    throw new functions.https.HttpsError(
      "not-found",
      "投稿の取得に失敗しました",
      "notFound"
    );
  }

  await fetchFirestore({ demo: demo, post: post });

  return post;
};

const fetchSearchAlgolia = async (
  data: Data,
  demo: boolean
): Promise<{
  posts: Result[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex(
    !data.target || data.target === "createAt"
      ? data.index
      : `${data.index}_${data.target}_${data.type}`
  );

  const hit: Algolia.Hit = {
    currentPage: data.page ? data.page : 0,
  };

  const result = await index
    .search<Algolia.Matter | Algolia.Company>(
      data.value ? data.value : "",
      data.index === "matters"
        ? {
            filters: "display:public",
            page: hit.currentPage,
          }
        : data.index === "companys"
        ? {
            filters: "status:enable AND plan:enable AND freelanceDirect:enable",
            page: hit.currentPage,
          }
        : {}
    )
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
      data.index === "matters"
        ? fetch.matter(<Algolia.Matter>hit)
        : data.index === "companys" &&
          (hit as Algolia.Company).person &&
          fetch.company.item(<Algolia.Company>hit, demo)
    )
    ?.filter((post) => post) as Result[];

  return { posts, hit };
};

const fetchFirestore = async ({
  demo,
  post,
}: {
  demo?: boolean;
  post: Algolia.Matter;
}): Promise<void> => {
  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(post.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "notFound"
      );
    });

  if (doc.exists) {
    if (post) {
      if (
        doc.data()?.payment.status === "canceled" ||
        !doc.data()?.payment.option?.freelanceDirect
      ) {
        post.uid = "";
        post.costs.display = "private";
        post.costs.type = "応談";
        post.costs.min = 0;
        post.costs.max = 0;
        post.user = fetch.company.office(demo);
      } else {
        post.user = fetch.company.supplementary(doc, demo);
      }
    }
  }

  return;
};

const fetchQueryFirestore = async (data: Data, posts: Result[]) => {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i]) {
      const doc = await db
        .collection("companys")
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
          data.index === "matters" &&
          (doc.data()?.payment.status === "canceled" ||
            !doc.data()?.payment.option?.freelanceDirect)
        ) {
          (posts as Algolia.Matter[])[i].costs.display = "private";
          (posts as Algolia.Matter[])[i].costs.type = "応談";
          (posts as Algolia.Matter[])[i].costs.min = 0;
          (posts as Algolia.Matter[])[i].costs.max = 0;
        }

        if (data.index === "companys") {
          if (
            doc.data()?.payment.status === "canceled" ||
            !doc.data()?.payment.option?.freelanceDirect
          ) {
            (posts as Algolia.CompanyItem[])[i].icon = "none";
            (posts as Algolia.CompanyItem[])[i].status = "none";
            (posts as Algolia.CompanyItem[])[i].type = "individual";
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

  return;
};

const fetchBests = async (
  post: Algolia.Matter
): Promise<Algolia.Matter[] | void> => {
  const index = algolia.initIndex("matters");

  const { hits } = await index
    .search<Algolia.Matter>("", {
      queryLanguages: ["ja", "en"],
      similarQuery: post?.handles?.join(" "),
      filters: "display:public",
      hitsPerPage: 100,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "algolia"
      );
    });

  const bests = hits
    ?.map((hit) => hit.objectID !== post.objectID && fetch.matter(hit))
    ?.filter((post) => post) as Algolia.Matter[];

  if (bests.length) {
    for (const post of bests) {
      post && (await fetchFirestore({ post: post }));
    }

    return bests;
  }

  return;
};

const addHistory = async (
  context: functions.https.CallableContext,
  data: string
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("persons")
    .withConverter(converter<Firestore.Person>())
    .doc(context.auth.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const histories = doc
      .data()
      ?.histories.filter((objectID) => objectID !== data);

    if (!histories) {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロフィールの更新に失敗しました",
        "firebase"
      );
    }

    await doc.ref
      .set(
        {
          histories: [data, ...histories].slice(0, 100),
        },
        { merge: true }
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "プロフィールの更新に失敗しました",
          "firebase"
        );
      });
  }

  return;
};

const checkDemo = (context: functions.https.CallableContext): boolean =>
  context.auth?.uid === functions.config().demo.freelance_direct.uid;
