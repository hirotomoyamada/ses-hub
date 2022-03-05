import * as functions from "firebase-functions";
import { dummy } from "../../dummy";
import * as Firestore from "../../types/firestore";
import * as Algolia from "../../types/algolia";
import { Hit } from "@algolia/client-search";
import { NestedPartial } from "../../types/utils";

export const company = {
  item: (hit: Algolia.Company, demo: boolean): Algolia.CompanyItem => {
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
      },
      createAt: hit.createAt,
    };
  },

  supplementary: (
    doc: FirebaseFirestore.DocumentSnapshot<Firestore.Company>,
    demo?: boolean
  ): NestedPartial<Firestore.Company> => {
    return {
      uid: doc.id,
      icon: doc.data()?.icon,
      type: doc.data()?.type,
      profile: {
        name: !demo
          ? doc.data()?.profile.name
          : doc.id !== functions.config().demo.ses_hub.uid
          ? dummy.name()
          : "Hit me up株式会社",
        person: !demo
          ? doc.data()?.profile.person
            ? doc.data()?.profile.person
            : "名無しさん"
          : doc.id !== functions.config().demo.ses_hub.uid
          ? dummy.person()
          : "羽生太郎",
        body: doc.data()?.profile.body,
        email: !demo ? doc.data()?.profile.email : undefined,
        social: !demo ? doc.data()?.profile.social : undefined,
      },
    };
  },

  office: (demo?: boolean): NestedPartial<Firestore.Company> => {
    return {
      uid: undefined,
      icon: "freelanceDirect",
      type: "office",
      profile: {
        name: "Hit me up株式会社",
        person: "Freelance Direct 事務局",
        body: undefined,
        email: !demo ? functions.config().admin.contact : undefined,
        social: undefined,
      },
    };
  },

  none: (): NestedPartial<Firestore.Company> => {
    return {
      uid: undefined,
      icon: "none",
      type: "none",
      profile: {
        name: undefined,
        person: "存在しないユーザー",
        body: undefined,
      },
    };
  },
};

export const matter = (hit: Algolia.Matter): Algolia.Matter => {
  return {
    objectID: hit.objectID,
    title: hit.title,
    position: hit.position,
    body: hit.body,
    location: hit.location,
    period: hit.period,
    costs:
      hit.costs.display === "public"
        ? {
            display: hit.costs.display,
            min: hit.costs.min,
            max: hit.costs.max,
          }
        : {
            display: hit.costs.display,
            type: hit.costs.type,
          },
    adjustment: hit.adjustment,
    times: hit.times,
    handles: hit.handles,
    tools: hit.tools,
    requires: hit.requires,
    prefers: hit.prefers,
    interviews: hit.interviews,
    remote: hit.remote,
    distribution: hit.distribution,
    span: hit.span,
    approval: hit.approval,
    note: hit.note,
    status: hit.status === "成約" ? hit.status : undefined,
    uid: hit.uid,
    createAt: hit.createAt,
    updateAt: hit.updateAt,
  };
};

export const promotion = (
  hit: Hit<Algolia.Matter>
): Algolia.MatterPromotion => {
  return {
    objectID: hit.objectID,
    title: hit.title,
    position: hit.position,
    body: hit.body,
    location: hit.location,
    costs:
      hit.costs.display === "public"
        ? {
            display: hit.costs.display,
            min: hit.costs.min,
            max: hit.costs.max,
          }
        : {
            display: hit.costs.display,
            type: hit.costs.type,
          },
    adjustment: hit.adjustment,
    times: hit.times,
    handles: hit.handles,
    remote: hit.remote,
    uid: hit.uid,
    createAt: hit.createAt,
  };
};
