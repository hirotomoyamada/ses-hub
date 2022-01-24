const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const loginAuthenticated =
  require("./functions/loginAuthenticated").loginAuthenticated;
const fetch = require("./fetch/fetch");

exports.login = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await loginAuthenticated({ context: context, data: data });

    const user = await fetchUser(context, data);
    const seshub = await fetchData();
    const demo = checkDemo(context);

    return { user: user, data: seshub, demo: demo };
  });

const fetchUser = async (context, data) => {
  const timestamp = Date.now();

  const doc = await db.collection("companys").doc(context.auth.uid).get();

  if (doc.exists) {
    await updateAlgolia(context, timestamp);

    if (doc.data().provider.length !== data.providerData.length) {
      await updateProvider(doc, data, timestamp);
      await loginAuthenticated({ doc: doc });

      return fetch.companys({ context: context, doc: doc, data: data });
    } else {
      await updateLogin(doc, timestamp);
      await loginAuthenticated({ doc: doc });

      return fetch.companys({ context: context, doc: doc });
    }
  } else {
    throw new functions.https.HttpsError(
      "not-found",
      "プロフィールが存在しません",
      "profile"
    );
  }
};

const updateLogin = async (doc, timestamp) => {
  await doc.ref.set(
    {
      lastLogin: timestamp,
    },
    { merge: true }
  );
};

const updateProvider = async (doc, data, timestamp) => {
  await doc.ref
    .set(
      {
        provider: data.providerData.map((provider) => provider.providerId),
        updateAt: timestamp,
        lastLogin: timestamp,
      },
      { merge: true }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "プロバイダーの更新に失敗しました",
        "provider"
      );
    });
};

const updateAlgolia = async (context, timestamp) => {
  const index = algolia.initIndex("companys");

  await index
    .partialUpdateObject({
      objectID: context.auth.uid,
      lastLogin: timestamp,
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "投稿の編集に失敗しました",
        "algolia"
      );
    });
};

const fetchData = async () => {
  const data = {};

  const querySnapshot = await db
    .collection("seshub")
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "データの取得に失敗しました",
        "firebase"
      );
    });

  querySnapshot?.forEach((doc) => {
    data[doc.id] = doc.data();
  });

  return data;
};

const checkDemo = (context) => {
  return context.auth.uid === functions.config().demo.ses_hub.uid;
};
