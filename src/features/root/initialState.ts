import { Data, Setting, User } from 'types/user';
import { Company } from 'types/post';

export type Search = {
  target?: string;
  type?: string;
  value?: string;
  control?: boolean;
};

export type Sort = {
  status?: string;
  display?: string;
  control: boolean;
};

export interface Announce {
  success?: string;
  error?: string;
}

export interface Modal {
  type?: string;
  text?: string;
  open?: boolean;
  meta?: {
    uid?: string;
    selectUser?: User | Company;
    email?: string;
    type?: string;
  };
  delete?: () => void;
  close?: () => void;
}

export type Verified = {
  index: boolean;
  email: boolean;
  profile: boolean;
  agree: boolean;
  status?: string;
  access: boolean;
  demo: boolean;
  error?: string;
  payment?: string;
};

export type Load = {
  root: boolean;
  pend: boolean;
  fetch: boolean;
  create: boolean;
};

export interface State {
  index: 'matters' | 'resources' | 'companys' | 'persons';
  page: string;
  search: Search;
  sort: Sort;
  modal: Modal;
  announce: Announce;
  data?: Data;
  verified: Verified;
  setting?: Setting;
  load: Load;
  notFound: boolean;
  limit: boolean;

  ver: string;
}

export const initialState: State = {
  index: 'matters',

  page: 'home',

  search: {
    value: undefined,
    target: undefined,
    type: undefined,
    control: false,
  },

  sort: {
    status: undefined,
    display: undefined,
    control: false,
  },

  modal: {
    type: undefined,
    open: false,
  },

  announce: {
    success: undefined,
    error: undefined,
  },

  data: undefined,

  verified: {
    index: false,
    email: false,
    profile: false,
    agree: false,
    status: undefined,
    access: true,
    demo: false,
    error: undefined,
    payment: undefined,
  },

  setting: undefined,

  load: {
    root: true,
    pend: false,
    fetch: false,
    create: false,
  },

  notFound: false,
  limit: false,

  ver: '2.4.1',
};
