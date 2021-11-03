const functions = require("firebase-functions");
const db = require("../../firebase").db;
const send = require("../../sendgrid");
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("./functions/userAuthenticated").userAuthenticated;
const body = require("../mail/body/users/request");

exports.addRequest = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
      index: data.index,
    });

    await updatePerson(context, data);

    return;
  });

const sendMail = async (context, user, selectUser, data) => {
  const url = {
    user: `${functions.config().app.ses_hub.url}/persons/${data.uid}`,
    selectUser: `${functions.config().app.freelance_direct.url}/user/${
      context.auth.uid
    }`,
  };

  const mail = {
    user: {
      to: user.profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "【リクエスト】確認メール",
      text: body.user({
        user: user.profile,
        type: user.type,
        body: data.body,
        url: url.user,
      }),
    },

    selectUser: {
      to: selectUser.profile.email,
      from: `SES_HUB <${functions.config().admin.freelance_direct}>`,
      subject: `【リクエスト】${user.profile.name}${
        user.type !== "corporate" && `\n${user.profile.person}`
      }さんから、リクエストがありました`,
      text: body.selectUser({
        user: selectUser.profile,
        type: user.type,
        body: data.body,
        url: url.selectUser,
      }),
    },
  };

  await send(mail.user);
  await send(mail.selectUser);
};

const updateDoc = async ({ context, doc, data, user }) => {
  const timestamp = Date.now();

  if (!user) {
    const selectUser = doc.data();
    const hold = doc.data().requests?.hold;

    await doc.ref
      .set(
        {
          requests: {
            hold: [context.auth.uid, ...hold],
          },
        },
        { merge: true }
      )
      .then(async () => {
        await updateUser(context, data, selectUser);
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "リクエストの追加に失敗しました",
          "firebase"
        );
      });
  } else {
    const entries = doc.data().entries?.persons;

    await doc.ref
      .set(
        {
          entries: {
            persons: entries
              ? entries.indexOf(data.uid) < 0 && [data.uid, ...entries]
              : [data.uid],
          },
          updateAt: timestamp,
        },
        { merge: true }
      )
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "エントリーの追加に失敗しました",
          "firebase"
        );
      });
  }
};

const checkDuplicate = (context, doc) => {
  if (
    doc.data().requests?.enable?.indexOf(context.auth.uid) >= 0 ||
    doc.data().requests?.hold?.indexOf(context.auth.uid) >= 0 ||
    doc.data().requests?.disable?.indexOf(context.auth.uid) >= 0
  ) {
    throw new functions.https.HttpsError(
      "data-loss",
      "すでにリクエスト済みのため、処理中止",
      "firebase"
    );
  }

  return;
};

const updateUser = async (context, data, selectUser) => {
  await db
    .collection("companys")
    .doc(context.auth.uid)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        const user = doc.data();

        await sendMail(context, user, selectUser, data);

        await updateDoc({ context: context, doc: doc, data: data, user: true });
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

const updatePerson = async (context, data) => {
  await db
    .collection("persons")
    .doc(data.uid)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        checkDuplicate(context, doc);

        await updateDoc({ context: context, doc: doc, data: data });
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
