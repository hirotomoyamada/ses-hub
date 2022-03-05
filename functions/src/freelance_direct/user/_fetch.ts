import * as functions from "firebase-functions";
import { dummy } from "../../dummy";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";
import { Data } from "./login";

export const login = ({
  context,
  doc,
  data,
}: {
  context: functions.https.CallableContext;
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Person>;
  data?: Data;
}) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  return {
    uid: context.auth.uid,
    icon: doc.data()?.icon,
    cover: doc.data()?.cover,
    provider: data
      ? data.providerData.map((provider) => provider.providerId)
      : doc.data()?.provider,
    profile: doc.data()?.profile,
    agree: doc.data()?.agree,
    likes: doc.data()?.likes,
    entries: doc.data()?.entries,
    requests: doc.data()?.requests,
    follows: doc.data()?.follows,
    home: doc.data()?.home,
    histories: doc.data()?.histories,
    resume: doc.data()?.resume,
    createAt: doc.data()?.createAt,
    updateAt: doc.data()?.updateAt,
  };
};

export const company = (
  hit: Algolia.Company,
  demo?: boolean
): Algolia.CompanyItem => {
  return {
    uid: hit.objectID,
    profile: {
      name: !demo
        ? hit.name
        : hit.objectID !== functions.config().demo.ses_hub.uid
        ? dummy.name()
        : "Hit me up株式会社",
      person: !demo
        ? hit.person
          ? hit.person
          : "名無しさん"
        : hit.objectID !== functions.config().demo.ses_hub.uid
        ? dummy.person()
        : "羽生太郎",
      body: hit.body,
      postal: hit.postal,
      address: hit.address,
      email: !demo ? hit.email : undefined,
      url: !demo ? hit.url : undefined,
      social: !demo ? hit.social : undefined,
    },
    createAt: hit.createAt,
  };
};
