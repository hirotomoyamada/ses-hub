export interface User {
  uid: string;
  ip: string | string[] | undefined;
  type: string;
  icon: string;
  cover: string;
  provider: string[];
  agree: string;
  remind?: string;
  status: string;
  profile: {
    name: string;
    person: string | null;
    body: string | null;
    invoice: { type: string; no: string | undefined } | null;
    postal: string | null;
    address: string | null;
    email: string;
    tel: string | null;
    more: string[];
    region: string[];
    url: string | null;
    social: {
      twitter: string | null;
      instagram: string | null;
      line: string | null;
      linkedIn: string | null;
    };
  };
  posts: { matters: string[]; resources: string[] };
  entries: {
    matters: string[];
    resources: string[];
    persons: string[];
  };
  likes: {
    matters: string[];
    resources: string[];
    persons: string[];
  };
  outputs: { matters: string[]; resources: string[] };
  follows: string[];
  followers: number;
  home: string[];
  payment: {
    status: string;
    trial: boolean;
    limit: number;
    notice: boolean;
    id?: string;
    option?: { [key: string]: boolean };
    link?: string;
    cancel?: boolean;
    load?: boolean;
    parent?: string;
    account?: number | null;
    children?: string[];
    start?: number | null;
    end?: number | null;
    price?: string | null;
  };
  setting?: Setting;
  createAt: number;
  updateAt?: number;
  application?: boolean;
  notice?: Notice;
}

export interface Setting {
  analytics?: {
    active: string[];
    order: string[];
    layout: 'line' | 'number' | 'none';
    color: {
      self: string;
      others: string;
    };
  };
}

export interface Notice {
  entry?: boolean;
}

export interface Data {
  agree: {
    body: string;
    status: string;
    title: string;
    updateAt: number;
  };

  information: {
    body: string;
    title: string;
    updateAt: number;
  };

  mail: {
    body: string;
    index: string;
    target: string;
    title: string;
    updateAt: number;
  };

  maintenance: {
    status: string;
    updateAt: number;
  };
}

export interface UserAgent {
  agent: string | undefined;
  ip: string | string[] | undefined;
}
