export interface Matter {
  objectID: string;
  title: string;
  industry: string;
  position: string;
  body: string;
  location: {
    area: string;
    place: string;
  };
  period: {
    year: number;
    month: number;
  };
  costs: {
    display: 'public' | 'private';
    type: string;
    min?: number | null;
    max?: number | null;
    contract?: number | null;
  };
  adjustment: string;
  times: {
    start: string;
    end: string;
  };
  handles: string[];
  tools: string[];
  requires: string[];
  prefers: string[];
  interviews: {
    type: string;
    count: string;
    setting: string;
  };
  remote: string;
  distribution: string;
  span: string;
  note: string;
  uid: string;
  createAt: number;
  updateAt?: number;
  status?: string;
  display?: 'public' | 'private';
  memo?: string;
  approval?: string;
  user?: {
    uid: string;
    type: string;
    status: string;
    profile: {
      name: string;
      person: string;
      email: string;
      social: {
        line: string;
        twitter: string;
        instagram: string;
        linkedIn: string;
      };
    };
  };
  likes?: number;
  outputs?: number;
  entries?: number;
}

export interface Resource {
  objectID: string;
  roman: {
    firstName: string;
    lastName: string;
  };
  position: string;
  sex: string;
  age: number;
  body: string;
  belong: string;
  station: string;
  period: {
    year: number;
    month: number;
  };
  costs: {
    display: 'public' | 'private';
    type: string;
    min?: number | null;
    max?: number | null;
    contract?: number | null;
  };
  handles: string[];
  tools: string[];
  skills: string[];
  parallel: string;
  note: string;
  uid: string;
  createAt: number;
  updateAt?: number;
  display?: 'public' | 'private';
  status?: string;
  memo?: {
    name: string;
    tel: string;
    address: string;
  };
  user?: {
    uid: string;
    type: string;
    status: string;
    profile: {
      name: string;
      person: string;
      email: string;
      social: {
        line: string;
        twitter: string;
        instagram: string;
        linkedIn: string;
      };
    };
  };
  likes?: number;
  outputs?: number;
  entries?: number;
}

export interface Company {
  uid: string;
  icon: string;
  cover: string;
  type: string;
  profile: {
    name: string;
    person: string | null;
    body: string | null;
    postal: string | null;
    address: string | null;
    tel: string | null;
    email: string | null;
    more: string[];
    region: string[];
    url: string | null;
    social?: {
      twitter: string | null;
      instagram: string | null;
      line: string | null;
      linkedIn: string | null;
    };
  };
  createAt: number;
  follows?: number;
  followers?: number;
  followed?: number;
  status?: string | null;
}

export interface Person {
  uid: string;
  icon: string;
  cover: string;
  profile: {
    state: string;
    nickName: string;
    name: string | null;
    body: string | null;
    email: string | null;
    position: string;
    age: string;
    sex: string;
    handles: string[];
    tools: string[];
    skills: string[];
    location: string;
    working: string | null;
    resident: string | null;
    clothes: string | null;
    urls?: string[];
    costs?: {
      display: string;
      min?: number;
      max?: number;
      type?: string;
    };
    period?: { year: string; month: string };
  };
  createAt: number;

  request?: 'enable' | 'hold' | 'none';
  resume?: string | null;
  status?: string | null;
  likes?: number;
}
