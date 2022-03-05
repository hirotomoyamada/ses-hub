import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../firebase";
import { algolia } from "../algolia";
import { userAuthenticated } from "./_userAuthenticated";
import * as Algolia from "../types/algolia";
import * as format from "./_format";
import * as Firestore from "../types/firestore";

type Data = {
  index: "matters" | "resources";
  post: Algolia.Matter | Algolia.Resource;
};

export const editPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);

    await editAlgolia(data);

    return;
  });

export const deletePost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await userAuthenticated(context);

    await deleteFirestore(data);
    await deleteAlgolia(data);

    return;
  });

const editAlgolia = async (data: Data): Promise<void> => {
  const index = algolia.initIndex(data.index);
  const post =
    data.index === "matters"
      ? format.matter(<Algolia.Matter>data.post)
      : data.index === "resources" &&
        format.resource(<Algolia.Resource>data.post);

  if (!post) {
    throw new functions.https.HttpsError(
      "data-loss",
      "投稿の編集に失敗しました",
      "algolia"
    );
  }

  await index
    .partialUpdateObject(post, {
      createIfNotExists: false,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "投稿の編集に失敗しました",
        "algolia"
      );
    });
};

const deleteFirestore = async (data: Data): Promise<void> => {
  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(data.post.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "投稿の削除に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const posts = doc
      .data()
      ?.posts[data.index].filter((objectID) => objectID !== data.post.objectID);

    if (!posts) {
      throw new functions.https.HttpsError(
        "data-loss",
        "投稿の削除に失敗しました",
        "firebase"
      );
    }

    doc.ref.set(
      {
        posts: Object.assign(doc.data()?.posts, { [data.index]: [...posts] }),
      },
      { merge: true }
    );
  }

  return;
};

const deleteAlgolia = async (data: Data): Promise<void> => {
  const index = algolia.initIndex(data.index);
  await index.deleteObject(data.post.objectID).catch(() => {
    throw new functions.https.HttpsError(
      "data-loss",
      "投稿の削除に失敗しました",
      "algolia"
    );
  });

  return;
};
