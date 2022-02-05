import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

import * as reducers from "./reducers/reducers";
import { extraReducers } from "./extraReducers/extraReducers";

export const rootSlice = createSlice({
  name: "root",
  initialState,

  reducers: {
    handleIndex: (state, action) => reducers.index(state, action),
    handleSearch: (state, action) => reducers.search(state, action),
    handleSort: (state, action) => reducers.sort(state, action),
    handlePage: (state, action) => reducers.page(state, action),
    handleModal: (state, action) => reducers.modal(state, action),
    handleAnnounce: (state, action) => reducers.announce(state, action),
    handleNotFound: (state, action) => reducers.notFound(state, action),
    handleLimit: (state, action) => reducers.limit(state, action),
    handleVerified: (state, action) => reducers.verified(state, action),
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
} = rootSlice.actions;

export const index = (state) => state.root.index;
export const page = (state) => state.root.page;
export const sort = (state) => state.root.sort;
export const search = (state) => state.root.search;
export const modal = (state) => state.root.modal;
export const announce = (state) => state.root.announce;
export const notFound = (state) => state.root.notFound;
export const limit = (state) => state.root.limit;
export const data = (state) => state.root.data;
export const verified = (state) => state.root.verified;
export const load = (state) => state.root.load;
export const ver = (state) => state.root.ver;

export default rootSlice.reducer;
