import * as functions from "firebase-functions";
import { algolia } from "../algolia";
import { converter, db, location, runtime } from "../firebase";
import { send } from "../sendgrid";
import { userAuthenticated } from "./_userAuthenticated";
import * as body from "./mail";
import * as format from "./_format";
import * as Firestore from "../types/firestore";
import * as Algolia from "../types/algolia";

export type Company = Algolia.Company & { icon: string; cover: string };
export type Person = Algolia.Person & { icon: string; cover: string };

type Data = {
  index: "companys" | "persons";
  user: Company | Person;
};

export const editUser = functions
  .region(location)
  .runWith(runtime)
  .https.onCall(async (data, context) => {
    await userAuthenticated(context);

    await editFirestore(data);
    await editAlgolia(data);

    return;
  });

const editAlgolia = async (data: Data): Promise<void> => {
  const index = algolia.initIndex(data.index);

  const user =
    data.index === "companys"
      ? format.company.algolia(data.user as Company)
      : format.person.algolia(data.user as Person);

  await index
    .partialUpdateObject(user, {
      createIfNotExists: true,
    })
    .catch(() => {
      throw new functions.https.HttpsError(
        "data-loss",
        "ユーザーの編集に失敗しました",
        "algolia"
      );
    });

  return;
};

const editFirestore = async (data: Data): Promise<void> => {
  const user =
    data.index === "companys"
      ? format.company.firestore(data.user as Company)
      : format.person.firestore(data.user as Person);

  const doc = await db
    .collection(data.index)
    .withConverter(converter<Firestore.Company | Firestore.Person>())
    .doc(data.user.uid)
    .get()
    .catch(() => {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    });

  if (doc.exists) {
    const application = (
      doc as FirebaseFirestore.DocumentSnapshot<Firestore.Company>
    ).data()?.application
      ? (doc as FirebaseFirestore.DocumentSnapshot<Firestore.Company>).data()
          ?.type === "individual" &&
        (user as Firestore.Company).type !== "individual"
        ? false
        : true
      : false;

    await doc.ref
      .set(
        Object.assign(
          doc.data(),
          data.index === "companys"
            ? { application: application, ...user }
            : user
        ),
        { merge: true }
      )
      .then(
        async () =>
          data.index === "companys" &&
          (await sendApplication(
            doc as FirebaseFirestore.DocumentSnapshot<Firestore.Company>,
            user as Firestore.Company
          ))
      )
      .catch(() => {
        throw new functions.https.HttpsError(
          "data-loss",
          "ユーザーの編集に失敗しました",
          "firebase"
        );
      });
  }

  return;
};

const sendApplication = async (
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company>,
  user: Firestore.Company
): Promise<void> => {
  if (
    doc.data()?.application &&
    doc.data()?.type === "individual" &&
    user.type !== "individual"
  ) {
    const profile = doc.data()?.profile;
    const url = `${functions.config().app.ses_hub.url}/plan`;

    if (!profile) {
      throw new functions.https.HttpsError(
        "not-found",
        "ユーザーの取得に失敗しました",
        "firebase"
      );
    }

    const userMail = {
      to: profile.email,
      from: `SES_HUB <${functions.config().admin.ses_hub}>`,
      subject: "SES_HUB 法人アカウントの承認完了のお知らせ",
      text: body.type.user(profile, url),
    };

    await send(userMail);
  }
};
