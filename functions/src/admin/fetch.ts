import * as functions from "firebase-functions";
import { algolia } from "../algolia";
import { converter, db, location, runtime } from "../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import { dataOrganize } from "./_dataOrganize";
import * as fetch from "./_fetch";
import * as Firestore from "../types/firestore";
import * as Auth from "../types/auth";
import * as Algolia from "../types/algolia";

type Arg = {
  posts: {
    index: "matters" | "resources" | "companys" | "persons";
    target: string | undefined;
    value: string | null;
    type: string | undefined;
    filter: string | undefined;
    page?: number;
  };

  user: { index: "companys" | "persons"; uid: string };
};

type Posts =
  | Algolia.Matter
  | Algolia.Resource
  | Algolia.Company
  | Algolia.Person;

type Results = Algolia.Matter | Algolia.Resource | Auth.Company | Auth.Person;

export const fetchPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (arg: Arg["posts"], context) => {
    await userAuthenticated(context);

    if (arg.filter === "application") {
      const { posts } = await fetchApplication(arg);

      return { index: arg.index, posts: posts };
    } else {
      const { posts, hit } = await fetchAlgolia(arg);

      posts.length && (await fetchFirestore(arg, posts));

      return { index: arg.index, posts: posts, hit: hit };
    }
  });

export const fetchUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (arg: Arg["user"], context) => {
    await userAuthenticated(context);

    const user = await fetchFirestore(arg);

    if (!user) {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    }

    return user;
  });

const fetchApplication = async (
  arg: Arg["posts"]
): Promise<{ posts: Auth.Company[] }> => {
  if (arg.index !== "companys") {
    throw new functions.https.HttpsError(
      "cancelled",
      "ユーザーのインデックスが無効です",
      "index"
    );
  }

  const collection = await db
    .collection(arg.index)
    .withConverter(converter<Firestore.Company>())
    .where("application", "==", true)
    .orderBy("lastLogin", "desc")
    .get();

  const posts = collection?.docs?.map((doc) => ({
    uid: doc.id,
    ...fetch.company.main(doc.data()),
  }));

  return { posts };
};

const fetchParent = async (uid?: string): Promise<Auth.Company | undefined> => {
  if (!uid) {
    return undefined;
  }

  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(uid)
    .get();

  const data = doc.data();

  if (!doc.exists || !data) {
    throw new functions.https.HttpsError(
      "not-found",
      "ユーザーの取得に失敗しました",
      "firebase"
    );
  }

  const parent = fetch.company.main(data);

  return parent;
};

const fetchFirestore = async (
  arg: Arg["posts"] | Arg["user"],
  posts?: Results[]
): Promise<Auth.Company | Auth.Person | void> => {
  if (posts?.length) {
    for (let i = 0; i < posts.length; i++) {
      const index = arg.index !== "persons" ? "companys" : "persons";
      const post = posts[i];
      const uid = post.uid;

      if (!uid) {
        if ("objectID" in post) {
          post.user = fetch.company.none();
        }

        return;
      }

      const doc = await db
        .collection(index)
        .withConverter(converter<Firestore.Company | Firestore.Person>())
        .doc(uid)
        .get()
        .catch(() => {
          throw new functions.https.HttpsError(
            "not-found",
            "ユーザーの取得に失敗しました",
            "firebase"
          );
        });

      const data = doc.data();

      if (!doc.exists || !data) {
        return;
      }

      if (
        (arg.index === "matters" || arg.index === "resources") &&
        "objectID" in post
      ) {
        post.user = fetch.company.itemSupplementary(<Firestore.Company>data);
      }

      if (arg.index === "companys") {
        fetch.company.supplementary(
          <Auth.Company>post,
          <Firestore.Company>data
        );
      }

      if (arg.index === "persons") {
        fetch.person.supplementary(<Auth.Person>post, <Firestore.Person>data);
      }
    }
  } else if ("uid" in arg) {
    const doc = await db
      .collection(arg.index)
      .withConverter(converter<Firestore.Company | Firestore.Person>())
      .doc(arg.uid)
      .get()
      .catch(() => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    const data = doc.data();

    if (!doc.exists || !data) {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    }

    const list = await dataOrganize(arg.index, doc).catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ユーザーの編集に失敗しました",
        "firebase"
      );
    });

    if ("payment" in data && "posts" in list) {
      const parent =
        data.type === "child"
          ? await fetchParent(data.payment.parent)
          : undefined;

      const user: Auth.Company = !parent
        ? { uid: doc.id, ...fetch.company.main(data, list) }
        : {
            uid: doc.id,
            parent: parent,
            ...fetch.company.main(data, list),
          };

      return user;
    }

    if ("resume" in data && "requests" in list) {
      const user: Auth.Person = {
        uid: doc.id,
        ...fetch.person.main(data, list),
      };

      return user;
    }

    return;
  }

  return;
};

const fetchAlgolia = async (
  arg: Arg["posts"]
): Promise<{
  posts: Results[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex(
    !arg.target ||
      ((arg.index === "matters" || arg.index === "resources") &&
        arg.target === "createAt") ||
      ((arg.index === "companys" || arg.index === "persons") &&
        arg.target === "lastLogin")
      ? arg.index
      : `${arg.index}_${arg.target}_${arg.type}`
  );

  const hit: Algolia.Hit = {
    currentPage: arg.page ? arg.page : 0,
  };

  const result = await index
    .search<Posts>(arg.value ? arg.value : "", {
      page: hit.currentPage,
      filters: arg.filter === "all" ? "" : arg.filter,
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
      arg.index === "matters"
        ? fetch.matter(<Algolia.Matter>hit)
        : arg.index === "resources"
        ? fetch.resource(<Algolia.Resource>hit)
        : arg.index === "companys"
        ? fetch.company.item(<Algolia.Company>hit)
        : arg.index === "persons" && fetch.person.item(<Algolia.Person>hit)
    )
    ?.filter((post) => post) as Results[];

  return { posts, hit };
};
