import * as functions from "firebase-functions";
import { algolia } from "../../algolia";
import { converter, db, location, runtime } from "../../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";
import { dummy } from "../../dummy";

type Data = {
  post: { index: "matters" | "resources"; objectID: string };
  posts: {
    index: "matters" | "resources" | "companys" | "persons";
    target: string | null;
    value: string | null;
    type: string | null;
    page?: number;
  };
};

type Post = Algolia.Matter | Algolia.Resource;

type Posts =
  | Algolia.Matter
  | Algolia.Resource
  | Algolia.Company
  | Algolia.Person;

type Results =
  | Algolia.Matter
  | Algolia.Resource
  | Algolia.CompanyItem
  | Algolia.PersonItem;

export const fetchPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data["post"], context) => {
    const status = await userAuthenticated({
      context: context,
      canceled: true,
    });

    const demo = checkDemo(context);

    const post = await fetchAlgolia(context, data, demo, status);

    const bests = post && (await fetchBests(context, data, post));

    return { post: post, bests: bests };
  });

export const fetchPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data["posts"], context) => {
    await userAuthenticated({
      context: context,
      index: data.index,
    });

    const demo = checkDemo(context);

    const { posts, hit } = await fetchSearchAlgolia(context, data, demo);

    posts.length && (await fetchQueryFirestore(context, data, posts));

    return { index: data.index, posts: posts, hit: hit };
  });

const fetchAlgolia = async (
  context: functions.https.CallableContext,
  data: Data["post"],
  demo: boolean,
  status: boolean
): Promise<Post | undefined> => {
  const index = algolia.initIndex(data.index);

  const hit = await index.getObject<Post>(data.objectID).catch(() => {
    throw new functions.https.HttpsError(
      "not-found",
      "投稿の取得に失敗しました",
      "notFound"
    );
  });

  if (data.index === "matters") {
    const post =
      hit.uid === context.auth?.uid
        ? fetch.auth.matter(hit as Algolia.Matter)
        : hit.display === "public" && fetch.other.matter(hit as Algolia.Matter);

    if (!post) {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "notFound"
      );
    }

    await fetchFirestore(demo, post, status);

    context.auth?.uid !== post.uid && (await updateLimit(context));

    return post;
  }

  if (data.index === "resources") {
    const post =
      hit.uid === context.auth?.uid
        ? fetch.auth.resource(hit as Algolia.Resource)
        : hit.display === "public" &&
          fetch.other.resource(hit as Algolia.Resource);

    if (!post) {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "notFound"
      );
    }

    await fetchFirestore(demo, post, status);

    context.auth?.uid !== post.uid && (await updateLimit(context));

    return post;
  }

  return;
};

const fetchSearchAlgolia = async (
  context: functions.https.CallableContext,
  data: Data["posts"],
  demo: boolean
): Promise<{
  posts: (Results | undefined)[];
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
    .search<Posts>(
      data.value ? data.value : "",
      data.index === "matters" || data.index === "resources"
        ? {
            filters: "display:public",
            page: hit.currentPage,
          }
        : data.index === "companys"
        ? {
            filters: "status:enable AND (plan:enable OR type:individual)",
            page: hit.currentPage,
          }
        : data.index === "persons"
        ? {
            filters: "status:enable",
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

  const posts = result?.hits?.map((hit) =>
    data.index === "matters" && hit.uid === context.auth?.uid
      ? fetch.auth.matter(<Algolia.Matter>hit)
      : data.index === "matters"
      ? fetch.other.matter(<Algolia.Matter>hit)
      : data.index === "resources" && hit.uid === context.auth?.uid
      ? fetch.auth.resource(<Algolia.Resource>hit)
      : data.index === "resources"
      ? fetch.other.resource(<Algolia.Resource>hit)
      : data.index === "companys" && (hit as Algolia.Company).person
      ? fetch.other.company(<Algolia.Company>hit, demo)
      : data.index === "persons"
      ? fetch.other.person(<Algolia.Person>hit)
      : undefined
  );

  return { posts, hit };
};

const fetchFirestore = async (
  demo: boolean,
  post: Post,
  status: boolean
): Promise<void> => {
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
    if (
      doc.data()?.type !== "individual" &&
      doc.data()?.payment.status === "canceled"
    ) {
      throw new functions.https.HttpsError(
        "not-found",
        "投稿の取得に失敗しました",
        "notFound"
      );
    }

    post.user = {
      uid: doc.id,
      icon: doc.data()?.icon,
      type: doc.data()?.type,
      status: doc.data()?.payment.status,
      profile: {
        name: !demo ? doc.data()?.profile.name : dummy.name(),
        person: !demo
          ? doc.data()?.profile.person
            ? doc.data()?.profile.person
            : "名無しさん"
          : dummy.person(),
        body: doc.data()?.profile.body,
        email: !demo ? doc.data()?.profile.email : undefined,
        social: !demo && status ? doc.data()?.profile.social : undefined,
      },
    };
  }
};

const fetchQueryFirestore = async (
  context: functions.https.CallableContext,
  data: Data["posts"],
  posts: (Results | undefined)[]
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
        .doc((posts as Results[])[i].uid)
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
          case "companys":
            {
              const data = doc.data() as Firestore.Company;

              (posts as Algolia.CompanyItem[])[i].icon = data.icon;
              (posts as Algolia.CompanyItem[])[i].type = data.type;
              (posts as Algolia.CompanyItem[])[i].status = data.payment.status;
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

  return;
};

const fetchBests = async (
  context: functions.https.CallableContext,
  data: Data["post"],
  post: Algolia.Matter | Algolia.Resource
): Promise<Post[] | undefined> => {
  const index = algolia.initIndex(data.index);

  const { hits } = await index
    .search<Post>("", {
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

  if (data.index === "matters") {
    const bests = hits
      ?.map((hit) =>
        hit.uid === context.auth?.uid && hit.objectID !== post.objectID
          ? fetch.auth.matter(hit as Algolia.Matter)
          : hit.objectID !== post.objectID &&
            fetch.other.matter(hit as Algolia.Matter)
      )
      ?.filter((post) => post);

    return bests as Algolia.Matter[];
  }

  if (data.index === "resources") {
    const bests = hits
      ?.map((hit) =>
        hit.uid === context.auth?.uid && hit.objectID !== post.objectID
          ? fetch.auth.resource(hit as Algolia.Resource)
          : hit.objectID !== post.objectID &&
            fetch.other.resource(hit as Algolia.Resource)
      )
      ?.filter((post) => post);

    return bests as Algolia.Resource[];
  }

  return;
};

const updateLimit = async (
  context: functions.https.CallableContext
): Promise<void> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(context.auth.uid)
    .get();

  if (doc.exists && doc.data()?.payment.status === "canceled") {
    const limit = doc.data()?.payment?.limit;

    if (!limit || limit <= 0) {
      throw new functions.https.HttpsError(
        "cancelled",
        "閲覧回数の上限を超えたため、閲覧することができません",
        "limit"
      );
    } else {
      await doc.ref
        .set(
          {
            payment: Object.assign(doc.data()?.payment, {
              limit: limit ? limit - 1 : 0,
            }),
          },
          { merge: true }
        )
        .catch(() => {
          throw new functions.https.HttpsError(
            "data-loss",
            "閲覧回数の更新に失敗しました",
            "firebase"
          );
        });
    }
  }

  return;
};

const checkDemo = (context: functions.https.CallableContext): boolean =>
  context.auth?.uid === functions.config().demo.ses_hub.uid;
