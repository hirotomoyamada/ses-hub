const functions = require("firebase-functions");
const algolia = require("../../algolia").algolia;
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../sendgrid").send;
const body = require("../mail/application/type");

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const edit = require("../edit/edit");

exports.editUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    await editFirestore(data);
    await editAlgolia(data);

    return;
  });

const editAlgolia = async (data) => {
  const index = algolia.initIndex(data.index);

  const user =
    data.index === "companys"
      ? edit.companys({ data: data })
      : data.index === "persons" && edit.persons({ data: data });

  await index
    .partialUpdateObject(
      data.index === "companys"
        ? edit.companys({ user: user })
        : data.index === "persons" && edit.persons({ user: user }),
      {
        createIfNotExists: true,
      }
    )
    .catch((e) => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ユーザーの編集に失敗しました",
        "algolia"
      );
    });

  return;
};

const editFirestore = async (data) => {
  const user =
    data.index === "companys"
      ? edit.companys({ data: data })
      : data.index === "persons" && edit.persons({ data: data });

  const doc = await db
    .collection(data.index)
    .doc(data.user.uid)
    .get()
    .catch((e) => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const application = doc.data()?.application
      ? doc.data().type === "individual" && user.type !== "individual"
        ? false
        : true
      : false;

    await doc.ref
      .set(
        data.index === "companys"
          ? {
              type: user.type,
              icon: user.icon,
              cover: user.cover,
              status: user.status,
              application: application,
              profile: user.profile,
              updateAt: user.updateAt,
            }
          : {
              icon: user.icon,
              cover: user.cover,
              status: user.status,
              profile: user.profile,
              updateAt: user.updateAt,
            },
        { merge: true }
      )
      .then(async () => {
        if (
          doc.data()?.application &&
          doc.data().type === "individual" &&
          user.type !== "individual"
        ) {
          const profile = doc.data().profile;
          const url = `${functions.config().app.ses_hub.url}/plan`;

          const userMail = {
            to: doc.data().profile.email,
            from: `SES_HUB <${functions.config().admin.ses_hub}>`,
            subject: "SES_HUB 法人アカウントの承認完了のお知らせ",
            text: body.user(profile, url),
          };

          await send(userMail);
        }
      })
      .catch((e) => {
        throw new functions.https.HttpsError(
          "data-loss",
          "ユーザーの編集に失敗しました",
          "firebase"
        );
      });
  }

  return;
};
