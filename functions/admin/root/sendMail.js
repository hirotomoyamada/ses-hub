const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const userAuthenticated =
  require("../functions/userAuthenticated").userAuthenticated;

const send = require("../../sendgrid").send;

/**********************************
 * お知らせメール 一斉送信
 **********************************/

exports.sendMail = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    // 有効なアカウントかどうかを判定
    await userAuthenticated(context);

    // Firestore へ保存
    await updateFirestore(data);

    // リクエストに基づいてメール内容を作成
    const mail = await createMail(data);

    // SendGrid でメールを一斉送信
    await send(mail);

    return data;
  });

/**********************************
 * 送信しない宛先を判定
 **********************************/

const verified = (email) => {
  const config = functions.config();

  return (
    config.admin.ses_hub !== email &&
    config.admin.freelance_direct !== email &&
    config.demo.ses_hub.email !== email &&
    config.demo.freelance_direct.email !== email &&
    true
  );
};

/**********************************
 * 送信する宛先をすべて取得
 **********************************/

const fetchTo = async (data) => {
  const to =
    data.index === "companys"
      ? await db
          .collection("companys")
          .where("status", "==", "enable")
          .where(
            "payment.status",
            data.target !== "all" ? "==" : "in",
            data.target !== "all"
              ? data.target
              : ["active", "canceled", "trialing"]
          )
          .get()
          .then((querySnapshot) => {
            // 本番コード
            return querySnapshot.docs.map(
              (doc) => verified(doc) && doc.data().profile.email
            );
          })
      : await db
          .collection("persons")
          .where("status", "==", "enable")
          .get()
          .then((querySnapshot) => {
            // 本番コード
            return querySnapshot.docs.map(
              (doc) => verified(doc) && doc.data().profile.email
            );
          });

  return to;
};

/**********************************
 * 送信するメール内容を作成
 **********************************/

const createMail = async (data) => {
  const to = await fetchTo(data);

  return {
    to: to,
    from:
      data.index === "companys"
        ? `SES_HUB <${functions.config().admin.ses_hub}>`
        : data.index === "persons" &&
          `Freelance Direct <${functions.config().admin.freelance_direct}>`,
    subject: data.title,
    text: data.body,
  };
};

/**********************************
 * Firestore 保存
 **********************************/

const updateFirestore = async (data) => {
  // ドキュメントを取得
  await db
    .collection(
      data.index === "companys"
        ? "seshub"
        : data.index === "persons" && "freelanceDirect"
    )
    .doc("mail")
    .get()
    .then(async (doc) => {
      // 更新日時を挿入
      data.updateAt = Date.now();

      // ドキュメントがあるかどうか判定
      if (doc.exists) {
        await doc.ref
          .set(
            data,
            // 上書きを許可するかどうか
            { merge: true }
          )
          .catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "データの更新に失敗しました",
              "firebase"
            );
          });
      }
    });
};
