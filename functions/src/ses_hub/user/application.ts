import * as functions from "firebase-functions";
import { converter, db, location, runtime } from "../../firebase";
import { send } from "../../sendgrid";
import { userAuthenticated } from "./_userAuthenticated";
import * as Firestore from "../../types/firestore";
import * as body from "../mail";

export const applicationType = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (_data: unknown, context) => {
    await userAuthenticated({
      context: context,
      demo: true,
    });

    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "認証されていないユーザーではログインできません",
        "auth"
      );
    }

    const timestamp = Date.now();

    const doc = await db
      .collection("companys")
      .withConverter(converter<Firestore.Company>())
      .doc(context.auth.uid)
      .get()
      .catch(() => {
        throw new functions.https.HttpsError(
          "not-found",
          "ユーザーの取得に失敗しました",
          "firebase"
        );
      });

    if (doc.exists) {
      userVarification(doc);

      await doc.ref
        .set(
          {
            application: true,
            updateAt: timestamp,
          },
          { merge: true }
        )
        .then(async () => {
          const adminUrl: string = functions.config().admin.url;
          const profile = doc.data()?.profile;

          if (!profile) {
            throw new functions.https.HttpsError(
              "not-found",
              "ユーザーの取得に失敗しました",
              "firebase"
            );
          }

          const adminMail = {
            to: functions.config().admin.ses_hub as string,
            from: `SES_HUB <${functions.config().admin.ses_hub}>`,
            subject: "【法人】申請されたメンバー",
            text: body.type.admin(profile, adminUrl),
          };

          await send(adminMail);
        })
        .catch(() => {
          throw new functions.https.HttpsError(
            "data-loss",
            "申請の変更に失敗しました",
            "firebase"
          );
        });
    }

    return;
  });

const userVarification = (
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company>
): void => {
  if (doc.data()?.application) {
    throw new functions.https.HttpsError(
      "cancelled",
      "すでに申請済みのため、処理中止",
      "firebase"
    );
  }

  if (doc.data()?.type !== "individual") {
    throw new functions.https.HttpsError(
      "cancelled",
      "法人アカウントのため、処理中止",
      "firebase"
    );
  }

  if (doc.data()?.payment?.price) {
    throw new functions.https.HttpsError(
      "cancelled",
      "プランを契約しているため、処理中止",
      "firebase"
    );
  }

  if (doc.data()?.payment?.children?.length) {
    throw new functions.https.HttpsError(
      "cancelled",
      "グループアカウントを保有しているため、処理中止",
      "firebase"
    );
  }

  if (
    !doc.data()?.payment?.price &&
    doc.data()?.payment?.status !== "canceled"
  ) {
    throw new functions.https.HttpsError(
      "cancelled",
      "特殊なアカウントのため、処理中止",
      "firebase"
    );
  }
};
