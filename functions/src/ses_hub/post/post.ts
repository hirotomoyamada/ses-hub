import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { algolia } from "../../algolia";
import { postAuthenticated } from "./_postAuthenticated";
import * as format from "./_format";
import * as Firestore from "../../types/firestore";
import { send } from "../../sendgrid";
import * as body from "../mail";
import * as Algolia from "../../types/algolia";
import { NestedPartial } from "../../types/utils";
import { tweet } from "../../twitter";
import { shortUrl } from "../../bitly";

export type Data = {
  index: "matters" | "resources";
  post: NestedPartial<Algolia.Matter> | NestedPartial<Algolia.Resource>;
};

export type User = {
  name: string;
  person: string;
};

export const createPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await postAuthenticated({ context: context });

    const post = await createAlgolia(context, data);

    await createFirestore(context, data, post);

    return { index: data.index, post: post };
  });

export const editPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await postAuthenticated({ context: context });

    if (context.auth?.uid === data.post.uid) {
      await editAlgolia(context, data);
    }
  });

export const deletePost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await postAuthenticated({ context: context });

    if (context.auth?.uid === data.post.uid) {
      await deleteAlgolia(data);
      await deleteFirestore(context, data);
    }
  });

export const sendPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data: Data, context) => {
    await postAuthenticated({
      context: context,
      canceled: true,
    });

    const post = data.post as Algolia.Matter | Algolia.Resource;

    if (post.display === "private") {
      throw new functions.https.HttpsError(
        "cancelled",
        "非公開の投稿のため、処理中止",
        "sendGrid"
      );
    }

    for await (const index of ["companys", "persons"]) {
      if (index === "persons" && data.index === "resources") {
        continue;
      }

      await sendMail(index, data, post);
      await sendTweet(index, data, post);
    }

    return;
  });

const createAlgolia = async (
  context: functions.https.CallableContext,
  data: Data
) => {
  const index = algolia.initIndex(data.index);

  const post =
    data.index === "matters"
      ? format.matter({
          post: data.post as NestedPartial<Algolia.Matter>,
          context: context,
        })
      : data.index === "resources" &&
        format.resource({
          post: data.post as NestedPartial<Algolia.Resource>,
          context: context,
        });

  if (!post) {
    throw new functions.https.HttpsError(
      "unavailable",
      "投稿の作成に失敗しました",
      "algolia"
    );
  }

  await index
    .saveObject(post, { autoGenerateObjectIDIfNotExist: true })
    .then(async (result) => {
      post.objectID = result.objectID;
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "unavailable",
        "投稿の作成に失敗しました",
        "algolia"
      );
    });

  return post as Algolia.Matter | Algolia.Resource;
};

const editAlgolia = async (
  context: functions.https.CallableContext,
  data: Data
) => {
  const index = algolia.initIndex(data.index);

  const post =
    data.index === "matters"
      ? format.matter({
          post: data.post as NestedPartial<Algolia.Matter>,
          context: context,
          edit: true,
        })
      : data.index === "resources" &&
        format.resource({
          post: data.post as NestedPartial<Algolia.Resource>,
          context: context,
          edit: true,
        });

  if (!post) {
    throw new functions.https.HttpsError(
      "unavailable",
      "投稿の作成に失敗しました",
      "algolia"
    );
  }

  await index.partialUpdateObject(post).catch(() => {
    throw new functions.https.HttpsError(
      "data-loss",
      "投稿の編集に失敗しました",
      "algolia"
    );
  });

  return;
};

const deleteAlgolia = async (data: Data) => {
  const index = algolia.initIndex(data.index);

  if (!data.post.objectID) {
    throw new functions.https.HttpsError(
      "data-loss",
      "削除する投稿の情報が不足しています",
      "algolia"
    );
  }

  await index.deleteObject(data.post.objectID).catch(() => {
    throw new functions.https.HttpsError(
      "data-loss",
      "投稿の削除に失敗しました",
      "algolia"
    );
  });

  return;
};

const createFirestore = async (
  context: functions.https.CallableContext,
  data: Data,
  post: Algolia.Matter | Algolia.Resource
) => {
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
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "プロフィールが存在しません",
        "profile"
      );
    });

  if (doc.exists) {
    const posts = doc.data()?.posts;

    doc.ref
      .set(
        {
          posts: Object.assign(
            posts,
            posts?.[data.index].length
              ? { [data.index]: [post.objectID, ...posts[data.index]] }
              : { [data.index]: [post.objectID] }
          ),
        },
        { merge: true }
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "unavailable",
          "プロフィールの更新に失敗しました",
          "disable"
        );
      });
  }
};

const deleteFirestore = async (
  context: functions.https.CallableContext,
  data: Data
) => {
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

    doc.ref.set(
      {
        posts: Object.assign(doc.data()?.posts, {
          [data.index]: [...(posts as string[])],
        }),
      },
      { merge: true }
    );
  }
};

const sendMail = async (
  index: string,
  data: Data,
  post: Algolia.Matter | Algolia.Resource
): Promise<void> => {
  const to = await fetchTo(index, post);

  const user: User = await fetchUser(post);

  const url =
    index === "companys"
      ? `${functions.config().app.ses_hub.url}/${data.index}/${post.objectID}`
      : `${functions.config().app.freelance_direct.url}/post/${post.objectID}`;

  const subject =
    data.index === "matters"
      ? `【新着案件】 ${(post as Algolia.Matter).title}`
      : `【新着人材】 ${(post as Algolia.Resource).roman.firstName.substring(
          0,
          1
        )} . ${(post as Algolia.Resource).roman.lastName.substring(0, 1)}`;

  const text =
    data.index === "matters"
      ? body.post.matter(post as Algolia.Matter, user, url)
      : body.post.resource(post as Algolia.Resource, user, url);

  const mail = {
    to: to,
    from:
      index === "companys"
        ? `SES_HUB <${functions.config().admin.ses_hub}>`
        : `Freelance Direct <${functions.config().admin.freelance_direct}>`,
    subject: subject,
    text: text,
  };

  await send(mail);
};

const sendTweet = async (
  index: string,
  data: Data,
  post: Algolia.Matter | Algolia.Resource
): Promise<void> => {
  const url = await shortUrl(
    index === "companys"
      ? `${functions.config().app.ses_hub.url}/${data.index}/${post.objectID}`
      : `${functions.config().app.freelance_direct.url}/post/${post.objectID}`
  );

  const txt =
    data.index === "matters"
      ? body.tweet.matter(post as Algolia.Matter, url)
      : body.tweet.resource(post as Algolia.Resource, url);

  index === "companys"
    ? await tweet.seshub(txt)
    : await tweet.freelanceDirect(txt);
};

const fetchUser = async (post: Algolia.Matter | Algolia.Resource) => {
  if (!post.uid) {
    throw new functions.https.HttpsError(
      "data-loss",
      "削除する投稿の情報が不足しています",
      "algolia"
    );
  }

  const doc = await db
    .collection("companys")
    .withConverter(converter<Firestore.Company>())
    .doc(post.uid)
    .get();

  const name = doc.data()?.profile.name;
  const person = doc.data()?.profile.person;

  if (!name || !person) {
    throw new functions.https.HttpsError(
      "data-loss",
      "送信元のユーザーの情報が不足しています",
      "firebase"
    );
  }

  return { name, person };
};

const fetchTo = async (
  index: string,
  post: Algolia.Matter | Algolia.Resource
) => {
  const querySnapshot = await db
    .collection(index)
    .withConverter(converter<Firestore.Company>())
    .where("status", "==", "enable")
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  const to = querySnapshot?.docs
    ?.map((doc) => verified(doc, post) && doc.data().profile.email)
    ?.filter((email) => email) as string[];

  return to;
};

const verified = (
  doc: FirebaseFirestore.QueryDocumentSnapshot<
    Firestore.Company | Firestore.Person
  >,
  post: Algolia.Matter | Algolia.Resource
) => {
  const id = doc.id;
  const email = doc.data().profile.email;
  const config = functions.config();

  return (
    post.uid !== id &&
    config.admin.ses_hub !== email &&
    config.admin.freelance_direct !== email &&
    config.demo.ses_hub.email !== email &&
    config.demo.freelance_direct.email !== email &&
    true
  );
};
