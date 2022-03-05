import * as Algolia from "../types/algolia";
import * as Firestore from "../types/firestore";
import * as Auth from "../types/auth";
import { List } from "./_dataOrganize";
import { NestedPartial } from "../types/utils";

export const matter = (hit: Algolia.Matter): Algolia.Matter => {
  return {
    display: hit.display,
    objectID: hit.objectID,
    title: hit.title,
    position: hit.position,
    body: hit.body,
    location: hit.location,
    period: hit.period,
    costs: hit.costs,
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
    status: hit.status,
    memo: hit.memo,
    uid: hit.uid,
    createAt: hit.createAt,
    updateAt: hit.updateAt,
  };
};

export const resource = (hit: Algolia.Resource): Algolia.Resource => {
  return {
    display: hit.display,
    objectID: hit.objectID,
    roman: hit.roman,
    position: hit.position,
    sex: hit.sex,
    age: hit.age,
    body: hit.body,
    belong: hit.belong,
    station: hit.station,
    period: hit.period,
    costs: hit.costs,
    handles: hit.handles,
    tools: hit.tools,
    skills: hit.skills,
    parallel: hit.parallel,
    note: hit.note,
    status: hit.status,
    memo: hit.memo,
    uid: hit.uid,
    createAt: hit.createAt,
    updateAt: hit.updateAt,
  };
};

export const company = {
  main: (data: Firestore.Company, list?: List["company"]): Auth.Company => {
    return {
      icon: data.icon,
      cover: data.cover,
      status: data.status,
      payment: data.payment,
      type: data.type,
      agree: data.agree,
      provider: data.provider,
      application: data.application,
      createAt: data.createAt,
      updateAt: data.updateAt,
      lastLogin: data.lastLogin,

      follows: list ? list.follows : data.follows,
      posts: list ? list.posts : data.posts,
      outputs: list ? list.outputs : data.outputs,
      likes: list ? list.likes : data.likes,
      entries: list ? list.entries : data.entries,
      home: list ? list.home : data.home,

      name: data.profile.name,
      person: data.profile.person,
      position: data.profile.position,
      body: data.profile.body,
      more: data.profile.more,
      region: data.profile.region,
      postal: data.profile.postal,
      address: data.profile.address,
      tel: data.profile.tel,
      email: data.profile.email,
      social: data.profile.social,
    };
  },

  supplementary: (post: Auth.Company, data: Firestore.Company): void => {
    post.icon = data.icon;
    post.cover = data.cover;
    post.status = data.status;
    post.application = data.application;
    post.provider = data.provider;
    post.type = data.type;
    post.agree = data.agree;
    post.posts = data.posts;
    post.likes = data.likes;
    post.outputs = data.outputs;
    post.entries = data.entries;
    post.follows = data.follows;
    post.home = data.home;
    post.payment = data.payment;
    post.createAt = data.createAt;
    post.updateAt = data.updateAt;
    post.lastLogin = data.lastLogin;

    return;
  },

  item: (hit: Algolia.Company): Auth.Company => {
    return {
      uid: hit.objectID,
      status: hit.status,
      type: hit.type,
      name: hit.name,
      person: hit.person,
      position: hit.position,
      body: hit.body,
      email: hit.email,
      tel: hit.tel,
      postal: hit.postal,
      address: hit.address,
      url: hit.url,
      social: hit.social,
      more: hit.more,
      region: hit.region,
      createAt: hit.createAt,
    };
  },

  itemSupplementary: (
    data: Firestore.Company
  ): NestedPartial<Firestore.Company> => {
    return {
      icon: data.icon,
      type: data.type,
      profile: {
        name: data.profile.name,
        person: data.profile.person,
        body: data.profile.body,
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

export const person = {
  main: (data: Firestore.Person, list: List["person"]): Auth.Person => {
    return {
      icon: data.icon,
      cover: data.cover,
      status: data.status,
      agree: data.agree,
      provider: data.provider,
      resume: data.resume,
      createAt: data.createAt,
      updateAt: data.updateAt,
      lastLogin: data.lastLogin,

      follows: list.follows,
      likes: list.likes,
      entries: list.entries,
      requests: list.requests,
      histories: list.histories,
      home: list.home,

      state: data.profile.state,
      nickName: data.profile.nickName,
      name: data.profile.name,
      email: data.profile.email,
      body: data.profile.body,
      age: data.profile.age,
      sex: data.profile.sex,
      position: data.profile.position,
      location: data.profile.location,
      handles: data.profile.handles,
      tools: data.profile.tools,
      skills: data.profile.skills,
      urls: data.profile.urls,
      costs: data.profile.costs,
      working: data.profile.working,
      resident: data.profile.resident,
      clothes: data.profile.clothes,
      period: data.profile.period,
    };
  },

  item: (hit: Algolia.Person): Auth.Person => {
    return {
      uid: hit.objectID,
      status: hit.status,
      state: hit.state,
      nickName: hit.nickName,
      name: hit.name,
      email: hit.email,
      body: hit.body,
      age: hit.age,
      sex: hit.sex,
      position: hit.position,
      location: hit.location,
      handles: hit.handles,
      tools: hit.tools,
      skills: hit.skills,
      urls: hit.urls,
      costs: hit.costs,
      resident: hit.resident,
      working: hit.working,
      clothes: hit.clothes,
      period: hit.period,
      createAt: hit.createAt,
    };
  },

  supplementary: (post: Auth.Person, data: Firestore.Person): void => {
    post.icon = data.icon;
    post.cover = data.cover;
    post.status = data.status;
    post.provider = data.provider;
    post.agree = data.agree;
    post.likes = data.likes;
    post.entries = data.entries;
    post.follows = data.follows;
    post.requests = data.requests;
    post.resume = data.resume;
    post.home = data.home;
    post.histories = data.histories;
    post.createAt = data.createAt;
    post.updateAt = data.updateAt;
    post.lastLogin = data.lastLogin;

    return;
  },
};
