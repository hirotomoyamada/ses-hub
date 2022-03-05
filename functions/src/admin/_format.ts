import * as Algolia from "../types/algolia";
import * as Firestore from "../types/firestore";
import { NestedPartial } from "../types/utils";
import { Company, Person } from "./user";

export const matter = (
  post: Algolia.Matter
): Omit<Algolia.Matter, "uid" | "createAt"> => {
  const timestamp = Date.now();

  return {
    display: post.display,
    objectID: post.objectID,
    title: post.title,
    position: post.position,
    body: post.body,
    location: post.location,
    period: {
      year: Number(post.period.year),
      month: Number(post.period.month),
    },
    costs: {
      min: post.costs?.min ? Number(post.costs?.min) : null,
      max: post.costs?.max ? Number(post.costs?.max) : null,
      contract: post.costs?.contract ? Number(post.costs?.contract) : null,
      display: post.costs.display,
      type: post.costs.type,
    },
    adjustment: post.adjustment,
    times: post.times,
    handles: post.handles,
    tools: post.tools,
    requires: post.requires,
    prefers: post.prefers,
    interviews: post.interviews,
    remote: post.remote,
    distribution: post.distribution,
    span: post.span,
    approval: post.approval,
    note: post.note,
    status: post.status,
    memo: post.memo,
    updateAt: timestamp,
  };
};

export const resource = (
  post: Algolia.Resource
): Omit<Algolia.Resource, "uid" | "createAt"> => {
  const timestamp = Date.now();

  return {
    display: post.display,
    objectID: post.objectID,
    roman: post.roman,
    position: post.position,
    sex: post.sex,
    age: Number(post.age),
    body: post.body,
    belong: post.belong,
    station: post.station,
    period: {
      year: Number(post.period.year),
      month: Number(post.period.month),
    },
    costs: {
      min: post.costs?.min ? Number(post.costs?.min) : null,
      max: post.costs?.max ? Number(post.costs?.max) : null,
      contract: post.costs?.contract ? Number(post.costs?.contract) : null,
      display: post.costs.display,
      type: post.costs.type,
    },
    handles: post.handles,
    tools: post.tools,
    skills: post.skills,
    parallel: post.parallel,
    note: post.note,
    status: post.status,
    memo: post.memo,
    updateAt: timestamp,
  };
};

export const company = {
  firestore: (user: Company): NestedPartial<Firestore.Company> => {
    const timestamp = Date.now();

    return {
      uid: user.uid,
      type: user.type,
      icon: user.icon,
      cover: user.cover,
      status: user.status,
      profile: {
        name: user.name,
        person: user.person,
        body: user.body,
        more: user.more ? user.more : [],
        region: user.region ? user.region : [],
        postal: user.postal,
        address: user.address,
        tel: user.tel,
        url: user.url,
        social: user.social,
      },
      updateAt: timestamp,
    };
  },

  algolia: (
    user: Company
  ): Omit<Algolia.Company, "uid" | "email" | "position" | "createAt"> => {
    const timestamp = Date.now();

    return {
      objectID: user.uid,
      type: user.type,
      status: user.status,
      name: user.name,
      person: user.person,
      body: user.body,
      more: user.more,
      region: user.region,
      postal: user.postal,
      address: user.address,
      tel: user.tel,
      url: user.url,
      social: user.social,
      updateAt: timestamp,
    };
  },
};

export const person = {
  firestore: (user: Person): NestedPartial<Firestore.Person> => {
    const timestamp = Date.now();

    return {
      uid: user.uid,
      icon: user.icon,
      cover: user.cover,
      status: user.status,
      profile: {
        state: user.state,
        nickName: user.nickName,
        name: user.name,
        body: user.body,
        age: Number(user.age),
        sex: user.sex,
        position: user.position,
        location: user.location,
        handles: user.handles,
        tools: user.tools,
        skills: user.skills,
        urls: user.urls,
        costs: {
          min: user.costs?.min ? Number(user.costs?.min) : null,
          max: user.costs?.max ? Number(user.costs?.max) : null,
          display: user.costs.display,
          type: user.costs.type,
        },
        working: user.working ? Number(user.working) : null,
        resident: user.resident ? user.resident : null,
        clothes: user.clothes ? user.clothes : null,
        period: {
          year: user.period.year ? Number(user.period.year) : null,
          month: user.period.month ? Number(user.period.month) : null,
        },
      },
      updateAt: timestamp,
    };
  },

  algolia: (
    user: Person
  ): Omit<Algolia.Person, "uid" | "email" | "createAt"> => {
    const timestamp = Date.now();

    return {
      objectID: user.uid,
      status: user.status,
      state: user.state,
      nickName: user.nickName,
      name: user.name,
      body: user.body,
      age: Number(user.age),
      sex: user.sex,
      position: user.position,
      location: user.location,
      handles: user.handles,
      tools: user.tools,
      skills: user.skills,
      urls: user.urls,
      costs: {
        min: user.costs?.min ? Number(user.costs?.min) : null,
        max: user.costs?.max ? Number(user.costs?.max) : null,
        display: user.costs.display,
        type: user.costs.type,
      },
      working: user.working ? Number(user.working) : null,
      resident: user.resident ? user.resident : null,
      clothes: user.clothes ? user.clothes : null,
      period: {
        year: user.period.year ? Number(user.period.year) : null,
        month: user.period.month ? Number(user.period.month) : null,
      },
      updateAt: timestamp,
    };
  },
};
