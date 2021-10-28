const functions = require("firebase-functions");
const db = require("../../firebase").db;
const send = require("../../sendgrid");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const body = require("../mail/body/users/request");

exports.enableRequest = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateUser({ context: context, data: data, enable: true });

    return;
  });

exports.disableRequest = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({ context: context, demo: true });

    await updateUser({ context: context, data: data });

    return;
  });

const sendMail = async (context, data, nickName) => {
  const user = await fetchUser(data);

  const url = `${functions.config().app.ses_hub.url}/persons/${
    context.auth.uid
  }`;

  const mail = {
    to: user.profile.email,
    from: `SES_HUB <${functions.config().admin.ses_hub}>`,
    subject: `【リクエスト】${nickName}さんが承認しました`,
    text: body.user({
      user: user.profile,
      nickName: nickName,
      url: url,
    }),
  };

  await send.freelanceDirect(mail);
};

const fetchUser = async (uid) => {
  const user = await db
    .collection("companys")
    .doc(uid)
    .get()
    .then((doc) => {
      if (
        doc.data().payment.status === "canceled" ||
        !doc.data().payment.option?.freelanceDirect
      ) {
        throw new functions.https.HttpsError(
          "cancelled",
          "オプション未加入のユーザーのため、処理中止",
          "firebase"
        );
      } else {
        return doc.exists && doc.data();
      }
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return user;
};

const updateDoc = async ({ context, doc, data, enable }) => {
  const timestamp = Date.now();

  const nickName = doc.data().profile.nickName;
  const disable = doc.data().requests?.disable?.indexOf(data) < 0;

  await doc.ref
    .set(
      {
        requests: enable
          ? {
              enable: [data, ...doc.data().requests?.enable],
              hold: doc.data().requests?.hold?.filter((uid) => uid !== data),
              disable: doc
                .data()
                .requests?.disable?.filter((uid) => uid !== data),
            }
          : {
              enable: doc
                .data()
                .requests?.enable?.filter((uid) => uid !== data),
              hold: doc.data().requests?.hold?.filter((uid) => uid !== data),
              disable: [data, ...doc.data().requests?.disable],
            },
        updateAt: timestamp,
      },
      { merge: true }
    )
    .then(async () => {
      enable && disable && (await sendMail(context, data, nickName));
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "リクエストの追加に失敗しました",
        "firebase"
      );
    });
};

const updateUser = async ({ context, data, enable }) => {
  await db
    .collection("persons")
    .doc(context.auth.uid)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        await updateDoc({
          context: context,
          doc: doc,
          data: data,
          enable: enable,
        });
      }
    })
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  return;
};
