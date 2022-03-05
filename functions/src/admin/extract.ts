import * as functions from "firebase-functions";
import { algolia } from "../algolia";
import { converter, db, location, runtime } from "../firebase";
import { userAuthenticated } from "./_userAuthenticated";
import * as fetch from "./_fetch";
import * as Auth from "../types/auth";
import * as Algolia from "../types/algolia";
import * as Firestore from "../types/firestore";

type Arg = {
  index:
    | "matters"
    | "resources"
    | "companys"
    | "persons"
    | "enable"
    | "hold"
    | "disable";
  user: Auth.Company | Auth.Person;
  type:
    | "children"
    | "follows"
    | "posts"
    | "likes"
    | "outputs"
    | "entries"
    | "histories"
    | "requests";
  page?: number;
};

type Posts =
  | Algolia.Matter
  | Algolia.Resource
  | Algolia.Company
  | Algolia.Person;

type Results = Algolia.Matter | Algolia.Resource | Auth.Company | Auth.Person;

export const extractPosts = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (arg: Arg, context) => {
    await userAuthenticated(context);

    const { posts, hit } = await fetchAlgolia(arg);

    await fetchFirestore(arg, posts);

    return { index: arg.index, type: arg.type, posts: posts, hit: hit };
  });

const fetchFirestore = async (arg: Arg, posts: Results[]): Promise<void> => {
  if (!posts?.length) {
    return;
  }

  if (
    arg.type === "requests" ||
    arg.index === "companys" ||
    arg.index === "persons"
  ) {
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const uid = post.uid;

      if (!uid) {
        if ("objectID" in post) {
          post.user = fetch.company.none();
        }

        return;
      }

      const doc = await db
        .collection(arg.type !== "requests" ? arg.index : "companys")
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

      if (arg.type === "requests" || arg.index === "companys") {
        fetch.company.supplementary(
          <Auth.Company>post,
          <Firestore.Company>data
        );
      }

      if (arg.index === "persons") {
        fetch.person.supplementary(<Auth.Person>post, <Firestore.Person>data);
      }
    }
  }

  return;
};

const fetchAlgolia = async (
  arg: Arg
): Promise<{
  posts: Results[];
  hit: Algolia.Hit;
}> => {
  const index = algolia.initIndex(
    arg.type !== "requests" ? arg.index : "companys"
  );

  const objectIDs =
    "posts" in arg.user
      ? arg.type === "children"
        ? arg.user.payment?.children
        : arg.type === "follows"
        ? arg.user[arg.type]
        : (arg.type === "likes" || arg.type === "entries") &&
          (arg.index === "matters" ||
            arg.index === "resources" ||
            arg.index === "persons")
        ? arg.user[arg.type]?.[arg.index]
        : (arg.type === "posts" || arg.type === "outputs") &&
          (arg.index === "matters" || arg.index === "resources")
        ? arg.user[arg.type]?.[arg.index]
        : undefined
      : "requests" in arg.user
      ? arg.type === "follows" ||
        arg.type === "likes" ||
        arg.type === "entries" ||
        arg.type === "histories"
        ? arg.user[arg.type]
        : arg.type === "requests" &&
          (arg.index === "enable" ||
            arg.index === "hold" ||
            arg.index === "disable")
        ? arg.user[arg.type]?.[arg.index]
        : undefined
      : undefined;

  if (!objectIDs) {
    throw new functions.https.HttpsError(
      "not-found",
      "投稿一覧の取得に失敗しました",
      "objectID"
    );
  }

  const hitsPerPage = 50;

  const hit: Algolia.Hit = {
    posts: objectIDs.length,
    pages: Math.ceil(objectIDs.length / 50),
    currentPage: arg.page ? arg.page : 0,
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
      hit && arg.index === "matters"
        ? fetch.matter(<Algolia.Matter>hit)
        : hit && arg.index === "resources"
        ? fetch.resource(<Algolia.Resource>hit)
        : hit && (arg.type === "requests" || arg.index === "companys")
        ? fetch.company.item(<Algolia.Company>hit)
        : hit &&
          arg.index === "persons" &&
          fetch.person.item(<Algolia.Person>hit)
    )
    ?.filter((post) => post) as Results[];

  return { posts, hit };
};
