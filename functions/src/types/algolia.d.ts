import { NestedPartial } from "./utils";
import * as Firestore from "./firestore";

export interface Hit {
  currentPage: number;
  posts?: number;
  pages?: number;
}

export interface Matter {
  objectID: string;
  display?: "public" | "private";
  status?: string;
  title: string;
  position: string;
  body: string;
  location: {
    area: string;
    place: string | null;
  };
  period: {
    year: number;
    month: number;
  };
  costs: {
    display: "public" | "private";
    type?: string;
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
  };
  remote: string;
  distribution: string;
  span: string;
  note: string | null;
  memo?: string | null;
  uid: string;
  createAt: number;
  updateAt?: number;
  approval?: string | null;
  user?: NestedPartial<Firestore.Company>;
}

export type MatterPromotion = Pick<
  Matter,
  | "objectID"
  | "title"
  | "position"
  | "body"
  | "location"
  | "costs"
  | "adjustment"
  | "times"
  | "handles"
  | "remote"
  | "uid"
  | "createAt"
>;

export interface Resource {
  objectID: string;
  display?: "public" | "private";
  status?: string;
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
    display: "public" | "private";
    type?: string;
    min?: number | null;
    max?: number | null;
    contract?: number | null;
  };
  handles: string[];
  tools: string[];
  skills: string[];
  parallel: string;
  note: string;
  memo?: {
    name: string | null;
    tel: string | null;
    address: string | null;
  };
  uid: string;
  createAt: number;
  updateAt?: number;
  user?: NestedPartial<Firestore.Company>;
}

export type ResourcePromotion = Pick<
  Resource,
  | "objectID"
  | "roman"
  | "position"
  | "body"
  | "belong"
  | "station"
  | "period"
  | "costs"
  | "handles"
  | "uid"
  | "createAt"
>;

export interface Company {
  objectID: string;
  uid: string;
  status: string;
  type: string;
  name: string;
  person: string | null;
  body: string | null;
  position: string | null;
  region: string[];
  more: string[];
  postal: string | null;
  address: string | null;
  tel: string | null;
  email: string;
  social: {
    line: string | null;
    instagram: string | null;
    twitter: string | null;
    linkedIn: string | null;
  };
  url: string | null;
  createAt: number;
  updateAt?: number;
  lastLogin?: number;
  freelanceDirect?: string;
  plan?: string;
}

export interface CompanyItem {
  uid: string;
  icon?: string;
  cover?: string;
  type?: string;
  status?: string;
  profile: Partial<Company>;
  createAt: number;
}

export interface Person {
  objectID: string;
  uid: string;
  status: string;
  state: string;
  name: string;
  nickName: string | null;
  body: string | null;
  email: string;
  sex: string;
  age: number;
  period: {
    year: number | null;
    month: number | null;
  };
  position: string;
  location: string;
  handles: string[];
  tools: string[];
  skills: string[];
  urls: string[];
  resident: string | null;
  working: number | null;
  clothes: string | null;
  costs: {
    min: number | null;
    max: number | null;
    display: "public" | "private";
    type: string;
  };
  createAt: number;
  updateAt?: number;
  lastLogin?: number;
}

export interface PersonItem {
  uid: string;
  icon?: string;
  cover?: string;
  profile: Partial<Person>;
  resume?: string | null;
  request?: string;
  createAt: number;
}
