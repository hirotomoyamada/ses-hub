export interface User {
  uid: string;
  type: string;
  icon: string;
  cover: string;
  provider: string[];
  agree: string;
  status: string;
  profile: {
    name: string;
    person: string | null;
    body: string | null;
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
  home: string[];
  payment: {
    status: string;
    trial: boolean;
    limit: number;
    notice: boolean;

    id?: string;
    option?: { freelanceDirect?: boolean };
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
}

export interface Setting {
  activity?: {
    active: string[];
    order: string[];
    layout: "line" | "number" | "none";
    color: {
      self: string;
      others: string;
    };
  };
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
