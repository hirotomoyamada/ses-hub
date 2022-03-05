import * as functions from "firebase-functions";
import { Parent } from "./child";
import { Data, Customer } from "./profile";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";

export const createFirestore = ({
  context,
  data,
  customer,
}: {
  context: functions.https.CallableContext;
  data: Data["create"];
  customer: Customer;
}): Firestore.Company => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = context.auth.token.auth_time * 1000;
  const icon = Math.floor(Math.random() * 17 + 1);
  const cover = Math.floor(Math.random() * 18 + 1);

  const profile = {
    name: data.name,
    person: data.person,
    position: data.position,
    body: null,
    postal: data.postal,
    address: data.address,
    email: context.auth.token.email as string,
    tel: data.tel,
    more: [],
    region: [],
    url: null,
    social: { twitter: null, instagram: null, line: null, linkedIn: null },
  };

  const payment = {
    id: customer.stripeId,
    link: customer.stripeLink,
    status: "canceled",
    trial: data.type !== "parent" ? true : false,
    limit: 10,
    notice: true,
    // ======= ver 2.X.X 削除予定 =======
    option: { freelanceDirect: true },
    // ================================
  };

  return {
    provider: [data.provider],
    status: "hold",
    type: data.type,
    agree: data.agree,
    icon: `icon${icon}`,
    cover: `cover${cover}`,
    profile: profile,
    payment: payment,
    posts: { matters: [], resources: [] },
    entries: { matters: [], resources: [], persons: [] },
    likes: { matters: [], resources: [], persons: [] },
    outputs: { matters: [], resources: [] },
    follows: [],
    home: [],
    createAt: timestamp,
    lastLogin: timestamp,
  };
};

export const createChildFirestore = ({
  context,
  parent,
}: {
  context: functions.https.CallableContext;
  parent: Parent;
}): Firestore.Company => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  if (!parent.profile || !parent.payment) {
    throw new functions.https.HttpsError(
      "data-loss",
      "親アカウントの情報に不備があります",
      "parent"
    );
  }

  const timestamp = context.auth.token.auth_time * 1000;
  const icon = Math.floor(Math.random() * 17 + 1);
  const cover = Math.floor(Math.random() * 18 + 1);

  const profile = {
    name: parent.profile.name,
    person: null,
    position: null,
    body: null,
    postal: parent.profile.postal,
    address: parent.profile.address,
    email: context.auth.token.email as string,
    tel: null,
    more: [],
    region: [],
    url: null,
    social: { twitter: null, instagram: null, line: null, linkedIn: null },
  };

  const payment = parent.payment.option
    ? {
        status: parent.payment?.status,
        trial: parent.payment?.trial,
        limit: 10,
        notice: parent.payment?.notice,
        option: parent.payment?.option,
        cancel: parent.payment?.cancel ? parent.payment?.cancel : false,
        load: parent.payment?.load ? parent.payment?.load : false,
        parent: parent?.uid,
        start: parent.payment?.start ? parent.payment?.start : null,
        end: parent.payment?.end ? parent.payment?.end : null,
        price: parent.payment?.price ? parent.payment?.price : null,
      }
    : {
        status: parent.payment?.status,
        trial: parent.payment?.trial,
        limit: 10,
        notice: parent.payment?.notice,
        cancel: parent.payment?.cancel ? parent.payment?.cancel : false,
        load: parent.payment?.load ? parent.payment?.load : false,
        parent: parent?.uid,
        start: parent.payment?.start ? parent.payment?.start : null,
        end: parent.payment?.end ? parent.payment?.end : null,
        price: parent.payment?.price ? parent.payment?.price : null,
      };

  return {
    provider: ["password"],
    status: "enable",
    type: "child",
    agree: "enable",
    icon: `icon${icon}`,
    cover: `cover${cover}`,
    profile: profile,
    payment: payment,
    posts: { matters: [], resources: [] },
    entries: { matters: [], resources: [], persons: [] },
    likes: { matters: [], resources: [], persons: [] },
    outputs: { matters: [], resources: [] },
    follows: [],
    home: [],
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
}): Algolia.Company => {
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
    type: data.type,
    // ======= ver 2.X.X 削除予定 =======
    freelanceDirect: "enable",
    // ================================
    name: data.name,
    person: data.person,
    body: null,
    position: data.position,
    postal: data.postal,
    address: data.address,
    tel: data.tel,
    email: context.auth.token.email as string,
    more: [],
    region: [],
    social: { twitter: null, instagram: null, line: null, linkedIn: null },
    url: null,
    createAt: timestamp,
    lastLogin: timestamp,
  };
};

export const createChildAlgolia = ({
  context,
  parent,
}: {
  context: functions.https.CallableContext;
  parent: Parent;
}): Algolia.Company => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  if (!parent.profile || !parent.payment) {
    throw new functions.https.HttpsError(
      "data-loss",
      "親アカウントの情報に不備があります",
      "parent"
    );
  }

  const timestamp = context.auth.token.auth_time * 1000;

  return {
    objectID: context.auth.uid,
    uid: context.auth.uid,
    status: "enable",
    type: "child",
    plan: parent.payment.status !== "canceled" ? "enable" : "disable",
    freelanceDirect: parent.payment.option?.freelanceDirect
      ? "enable"
      : "disable",
    name: parent.profile.name,
    person: null,
    body: null,
    position: null,
    postal: parent.profile.postal,
    address: parent.profile.address,
    tel: null,
    email: context.auth.token.email as string,
    more: [],
    region: [],
    social: { twitter: null, instagram: null, line: null, linkedIn: null },
    url: null,
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
  doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company>;
}): Pick<Firestore.Company, "icon" | "cover" | "profile" | "updateAt"> => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "認証されていないユーザーではログインできません",
      "auth"
    );
  }

  const timestamp = Date.now();

  const profile = {
    name: data.name,
    person: data.person,
    body: data.body,
    more: data.more ? data.more : [],
    region: data.region ? data.region : [],
    postal: data.postal,
    address: data.address,
    tel: data.tel,
    url: data.url,
    social: data.social,
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
  Algolia.Company,
  "uid" | "status" | "position" | "createAt" | "type" | "email"
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
    name: data.name,
    person: data.person,
    body: data.body,
    more: data.more,
    region: data.region,
    postal: data.postal,
    address: data.address,
    tel: data.tel,
    url: data.url,
    social: data.social,
    updateAt: timestamp,
  };
};
