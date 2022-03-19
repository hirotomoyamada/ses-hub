import { Data, User } from "types/user";
import { Company } from "types/post";

export interface State {
  index: "matters" | "resources" | "companys" | "persons";

  page: string;

  search: {
    value: string | null;
    target: string | null;
    type: string | null;
    control: boolean;
  };

  sort: {
    status: string | null;
    display: string | null;
    control: boolean;
  };

  modal: {
    type: string | null;
    open: boolean;
    text?: string;
    meta?: {
      uid?: string;
      selectUser?: User | Company;
      email?: string;
      type?: string;
    };
    close?: () => void;
    delete?: () => void;
  };

  announce: {
    success?: string;
    error?: string;
  };

  data: Data | null;

  verified: {
    index: boolean;
    email: boolean;
    profile: boolean;
    agree: boolean;
    status: string | null;
    access: boolean;
    demo: boolean;
    error: string | null;
    payment: string | null;
  };

  load: {
    root: boolean;
    list: boolean;
    fetch: boolean;
    create: boolean;
  };

  notFound: boolean;
  limit: boolean;

  ver: string;
}

export const initialState: State = {
  index: "matters",

  page: "home",

  search: {
    value: null,
    target: null,
    type: null,
    control: false,
  },

  sort: {
    status: null,
    display: null,
    control: false,
  },

  modal: {
    type: null,
    open: false,
  },

  announce: {
    success: undefined,
    error: undefined,
  },

  data: null,

  verified: {
    index: false,
    email: false,
    profile: false,
    agree: false,
    status: null,
    access: true,
    demo: false,
    error: null,
    payment: null,
  },

  load: {
    root: true,
    list: false,
    fetch: false,
    create: false,
  },

  notFound: false,
  limit: false,

  ver: "2.1.1",
};
