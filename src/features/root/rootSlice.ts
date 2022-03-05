import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import { initialState, State } from "features/root/initialState";
import { Company } from "types/post";
import { User } from "types/user";

import * as reducers from "./reducers";
import { extraReducers } from "./extraReducers";

export interface Search {
  target?: string;
  type?: string;
  value?: string;
  control?: boolean;
}

export interface Sort {
  status?: string;
  display?: string;
}

export interface Announce {
  success?: string;
  error?: string;
}

export interface Modal {
  type: string;
  text?: string;
  meta?: {
    uid?: string;
    selectUser?: User | Company;
    email?: string;
    type?: string;
  };
  delete?: () => void;
  close?: () => void;
}

export const rootSlice = createSlice({
  name: "root",
  initialState,

  reducers: {
    handleIndex: (
      state,
      action: PayloadAction<"matters" | "resources" | "companys" | "persons">
    ) => reducers.index(state, action),
    handleSearch: (state, action: PayloadAction<Search | undefined>) =>
      reducers.search(state, action),
    handleSort: (state, action: PayloadAction<Sort>) =>
      reducers.sort(state, action),
    handlePage: (state, action: PayloadAction<string>) =>
      reducers.page(state, action),
    handleModal: (state, action: PayloadAction<Modal | undefined>) =>
      reducers.modal(state, action),
    handleAnnounce: (state, action: PayloadAction<Announce | undefined>) =>
      reducers.announce(state, action),
    handleNotFound: (state, action: PayloadAction<boolean>) =>
      reducers.notFound(state, action),
    handleLimit: (state, action: PayloadAction<boolean>) =>
      reducers.limit(state, action),
    handleVerified: (state) => reducers.verified(state),
    handleAgree: (state, action: PayloadAction<User>) =>
      reducers.agree(state, action),
  },

  extraReducers: (builder) => extraReducers(builder),
});

export const {
  handleIndex,
  handleSearch,
  handlePage,
  handleSort,
  handleModal,
  handleAnnounce,
  handleNotFound,
  handleLimit,
  handleVerified,
  handleAgree,
} = rootSlice.actions;

export const index = (state: RootState): State["index"] => state.root.index;
export const page = (state: RootState): State["page"] => state.root.page;
export const sort = (state: RootState): State["sort"] => state.root.sort;
export const search = (state: RootState): State["search"] => state.root.search;
export const modal = (state: RootState): State["modal"] => state.root.modal;
export const announce = (state: RootState): State["announce"] =>
  state.root.announce;
export const notFound = (state: RootState): State["notFound"] =>
  state.root.notFound;
export const limit = (state: RootState): State["limit"] => state.root.limit;
export const data = (state: RootState): State["data"] => state.root.data;
export const verified = (state: RootState): State["verified"] =>
  state.root.verified;
export const load = (state: RootState): State["load"] => state.root.load;
export const ver = (state: RootState): State["ver"] => state.root.ver;

export default rootSlice.reducer;
