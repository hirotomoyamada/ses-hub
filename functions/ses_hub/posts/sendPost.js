const functions = require("firebase-functions");
const db = require("../../firebase").db;
const location = require("../../firebase").location;
const runtime = require("../../firebase").runtime;

const send = require("../../send-grid");

exports.sendPost = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    if (context.auth.uid !== functions.config().admin.uid) {
      throw new functions.https.HttpsError(
        "cancelled",
        "無効なユーザーのため、処理中止",
        "firebase"
      );
    }

    await db
      .collection(
        data.index === "companys"
          ? "seshub"
          : data.index === "persons" && "freelanceDirect"
      )
      .doc("mail")
      .get()
      .then(async (doc) => {
        data.updateAt = Date.now();

        if (doc.exists) {
          await doc.ref.set(data, { merge: true }).catch((e) => {
            throw new functions.https.HttpsError(
              "data-loss",
              "データの更新に失敗しました",
              "firebase"
            );
          });
        }
      });

    const to = await db
      .collection("companys")
      .where("status", "==", "enable")
      .where(
        "payment.status",
        data.target !== "all" ? "==" : "in",
        data.target !== "all" ? data.target : ["active", "canceled", "trialing"]
      )
      .get()
      .then((querySnapshot) => {
        // 本番コード
        // return querySnapshot.docs.map((doc) => doc.data().profile.email);

        // テストコード
        return querySnapshot.docs.map((doc) => {
          const email = doc.data().profile.email;
          const name = email.substring(0, email.indexOf("@"));
          const dummy = name.concat("@sink.sendgrid.net");

          return dummy;
        });
      });

    // テストコード
    // let to = [];

    // for (let i = 0; i < 100; i++) {
    //   const name = ["yamada", "ito", "sato", "kato", "suzuki"][
    //     Math.floor(Math.random() * 5)
    //   ];
    //   const sub = Math.random().toString(32).substring(2);
    //   const domain = "@sink.sendgrid.net";
    //   const email = name.concat(sub, domain);

    //   to = [email, ...to];
    // }

    const mail = {
      to: to,
      from:
        data.index === "companys"
          ? `SES_HUB <${functions.config().admin.ses_hub}>`
          : data.index === "persons" &&
            `Freelance Direct <${functions.config().admin.freelance_direct}>`,
      subject: data.title,
      text: data.body,
    };

    await send.seshub(mail);

    return data;
  });
