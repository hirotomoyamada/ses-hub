import * as functions from "firebase-functions";
import { Data } from "./profile";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";

export const createFirestore = ({
  context,
  data,
  file,
}: {
  context: functions.https.CallableContext;
  data: Data["create"];
  file: { key: string; url: string };
}): Firestore.Person => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = context.auth.token.auth_time * 1000;
  const icon = Math.floor(Math.random() * (36 - 18) + 18);
  const cover = Math.floor(Math.random() * 19);

  const profile: Firestore.Person["profile"] = {
    state: "案件探し中",
    nickName: null,
    name: data.name,
    email: context.auth.token.email as string,
    age: Number(data.age),
    sex: data.sex,
    position: data.position,
    location: data.location,
    handles: data.handles,
    body: null,
    tools: [],
    skills: [],
    urls: [],
    costs: {
      min: null,
      max: null,
      display: "private",
      type: "応談",
    },
    working: null,
    resident: null,
    clothes: null,
    period: { year: null, month: null },
  };

  return {
    status: "hold",
    agree: data.agree,
    resume: {
      key: file.key,
      url: file.url,
    },
    provider: [data.provider],
    icon: `icon${icon}`,
    cover: `cover${cover}`,
    profile: profile,
    entries: [],
    likes: [],
    requests: {
      enable: [],
      hold: [],
      disable: [],
    },
    follows: [],
    home: [],
    histories: [],
    createAt: timestamp,
    lastLogin: timestamp,
  };
};

export const createAlgolia = ({
  context,
  data,
}: {
  context: functions.https.CallableContext;
  data: Data["create"];
}): Algolia.Person => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = context.auth.token.auth_time * 1000;

  return {
    objectID: context.auth.uid,
    uid: context.auth.uid,
    status: "hold",
    state: "案件探し中",
    nickName: null,
    name: data.name,
    email: context.auth.token.email as string,
    age: data.age,
    sex: data.sex,
    position: data.position,
    location: data.location,
    handles: data.handles,
    body: null,
    tools: [],
    skills: [],
    urls: [],
    costs: {
      min: null,
      max: null,
      display: "private",
      type: "応談",
    },
    working: null,
    clothes: null,
    resident: null,
    period: { year: null, month: null },
    createAt: timestamp,
    lastLogin: timestamp,
  };
};

export const editFirestore = ({
  context,
  data,
  doc,
}: {
  context: functions.https.CallableContext;
  data: Data["edit"];
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Person>;
}): Pick<Firestore.Person, "icon" | "cover" | "profile" | "updateAt"> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  const profile = {
    nickName: data.nickName,
    body: data.body,
    age: Number(data.age),
    sex: data.sex,
    position: data.position,
    location: data.location,
    period: {
      year: data.period.year ? Number(data.period.year) : null,
      month: data.period.month ? Number(data.period.month) : null,
    },
    handles: data.handles,
    tools: data.tools,
    skills: data.skills,
    urls: data.urls,
    resident: data.resident,
    working: data.working ? Number(data.working) : null,
    clothes: data.clothes,
    costs: {
      min: data.costs.min ? Number(data.costs.min) : null,
      max: data.costs.max ? Number(data.costs.max) : null,
      display: data.costs.display,
      type: data.costs.type,
    },
  };

  return {
    icon: data.icon,
    cover: data.cover,
    profile: Object.assign(doc.data()?.profile, profile),
    updateAt: timestamp,
  };
};

export const editAlgolia = ({
  context,
  data,
}: {
  context: functions.https.CallableContext;
  data: Data["edit"];
}): Omit<
  Algolia.Person,
  "uid" | "status" | "state" | "name" | "email" | "createAt"
> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  return {
    objectID: context.auth.uid,
    nickName: data.nickName,
    body: data.body,
    age: Number(data.age),
    sex: data.sex,
    position: data.position,
    location: data.location,
    period: {
      year: data.period.year ? Number(data.period.year) : null,
      month: data.period.month ? Number(data.period.month) : null,
    },
    handles: data.handles,
    tools: data.tools,
    skills: data.skills,
    urls: data.urls,
    resident: data.resident,
    working: data.working ? Number(data.working) : null,
    clothes: data.clothes,
    costs: {
      min: data.costs.min ? Number(data.costs.min) : null,
      max: data.costs.min ? Number(data.costs.max) : null,
      display: data.costs.display,
      type: data.costs.type,
    },
    updateAt: timestamp,
  };
};
