import * as functions from "firebase-functions";
import { dummy } from "../../dummy";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";
import { Data } from "./login";
import { Hit } from "@algolia/client-search";

export const login = ({
  context,
  doc,
  data,
}: {
  context: functions.https.CallableContext;
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company>;
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
    type: doc.data()?.type,
    application: doc.data()?.application,
    agree: doc.data()?.agree,
    payment: doc.data()?.payment,
    posts: doc.data()?.posts,
    entries: doc.data()?.entries,
    likes: doc.data()?.likes,
    follows: doc.data()?.follows,
    home: doc.data()?.home,
    outputs: doc.data()?.outputs,
    createAt: doc.data()?.createAt,
    updateAt: doc.data()?.updateAt,
  };
};

export const company = {
  active: (hit: Algolia.Company, demo?: boolean): Algolia.CompanyItem => {
    return {
      uid: hit.objectID,
      profile: {
        name: !demo ? hit.name : dummy.name(),
        person: !demo
          ? hit.person
            ? hit.person
            : "名無しさん"
          : dummy.person(),
        body: hit.body,
        postal: hit.postal,
        address: hit.address,
        tel: !demo ? hit.tel : undefined,
        email: !demo ? hit.email : undefined,
        more: hit.more,
        region: hit.region,
        url: !demo ? hit.url : undefined,
        social: !demo ? hit.social : undefined,
      },
      createAt: hit.createAt,
    };
  },
  
  canceled: (hit: Algolia.Company, demo?: boolean): Algolia.CompanyItem => {
    return {
      uid: hit.objectID,
      profile: {
        name: !demo ? hit.name : dummy.name(),
        person: !demo
          ? hit.person
            ? hit.person
            : "名無しさん"
          : dummy.person(),
        body: hit.body,
        email: !demo ? hit.email : dummy.email(),
        more: hit.more,
        region: hit.region,
      },
      createAt: hit.createAt,
    };
  },
};

export const person = (
  hit: Algolia.Person,
  demo?: boolean
): Algolia.PersonItem => {
  return {
    uid: hit.objectID,
    profile: {
      state: hit.state,
      nickName: hit.nickName,
      name: !demo ? hit.name : undefined,
      email: !demo ? hit.email : undefined,
      age: hit.age,
      sex: hit.sex,
      position: hit.position,
      location: hit.location,
      handles: hit.handles,
      body: hit.body,
      tools: hit.tools,
      skills: hit.skills,
      urls: !demo ? hit.urls : [],
      costs: hit.costs,
      working: hit.working,
      resident: hit.resident,
      clothes: hit.clothes,
      period: hit.period,
    },
    createAt: hit.createAt,
  };
};

export const best = (hit: Hit<Algolia.Person>): Algolia.PersonItem => {
  return {
    uid: hit.objectID,
    profile: {
      state: hit.state,
      nickName: hit.nickName,
      position: hit.position,
      age: hit.age,
      sex: hit.sex,
      handles: hit.handles,
      costs: hit.costs,
      period: hit.period,
      location: hit.location,
      body: hit.body,
    },
    createAt: hit.createAt,
  };
};
