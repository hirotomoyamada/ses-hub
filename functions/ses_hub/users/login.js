const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const loginAuthenticated =
  require("./functions/loginAuthenticated").loginAuthenticated;

const userData = ({ context, doc, data }) => {
  return {
    uid: context.auth.uid,
    icon: doc.data().icon,
    cover: doc.data().cover,
    provider: data
      ? data.providerData.map((provider) => provider.providerId)
      : doc.data().provider,
    profile: doc.data().profile,
    agree: doc.data().agree,
    payment: {
      status: doc.data().payment.status,
      option: doc.data().payment.option,
      price: doc.data().payment.price,
      end: doc.data().payment.end,
      notice: doc.data().payment.notice,
      cancel: doc.data().payment.cancel,
      trial: doc.data().payment.trial,
      load: doc.data().payment.load,
    },
    posts: doc.data().posts,
    entries: doc.data().entries,
    likes: doc.data().likes,
    follows: doc.data().follows,
    home: doc.data().home,
    outputs: doc.data().outputs,
    createAt: doc.data().createAt,
    updateAt: doc.data().updateAt,
  };
};

exports.login = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await loginAuthenticated({ context: context, data: data });

    const dataTime = Date.now();
    
    const user =
      context.auth &&
      data.emailVerified &&
      (await db
        .collection("companys")
        .doc(context.auth.uid)
        .get()
        .then(async (doc) => {
          const index = algolia.initIndex("companys");

          await index
            .partialUpdateObject({
              objectID: context.auth.uid,
              lastLogin: dataTime,
            })
            .catch((e) => {
              throw new functions.https.HttpsError(
                "data-loss",
                "投稿の編集に失敗しました",
                "algolia"
              );
            });

          if (
            doc.exists &&
            doc.data().provider.length !== data.providerData.length
          ) {
            doc.ref
              .set(
                {
                  provider: data.providerData.map(
                    (provider) => provider.providerId
                  ),
                  updateAt: dataTime,
                  lastLogin: dataTime,
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

            await loginAuthenticated({ doc: doc });

            return userData({ context: context, doc: doc, data: data });
          } else if (doc.exists) {
            doc.ref.set(
              {
                lastLogin: dataTime,
              },
              { merge: true }
            );

            await loginAuthenticated({ doc: doc });

            return userData({ context: context, doc: doc });
          } else {
            throw new functions.https.HttpsError(
              "not-found",
              "プロフィールが存在しません",
              "profile"
            );
          }
        }));

    const collection = {};

    await db
      .collection("seshub")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          collection[doc.id] = doc.data();
        });
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "not-found",
          "データの取得に失敗しました",
          "firebase"
        );
      });

    const demo =
      context.auth.uid === functions.config().demo.uid ? true : false;

    return { user: user, data: collection, demo: demo };
  });
