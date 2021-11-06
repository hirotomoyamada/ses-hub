import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

import * as reducers from "./reducers/reducers";

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
    handleVerified: (state, action) => reducers.verified(state, action),
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state, action) => {
        state.load.fetch =
          action.meta.arg.fetch || action.type === "post/createPost/pending"
            ? true
            : false;

        if (action.type !== "post/createPost/pending") {
          state.load.list = true;
        }
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.notFound = true;

        state.load.fetch = false;
        state.load.list = false;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type.endsWith("/fulfilled") &&
        action.type !== "user/login/fulfilled",
      (state) => {
        state.load.fetch = false;
        state.load.list = false;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/login/fulfilled"),
      (state, action) => reducers.verified(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/logout"),
      (state) => {
        state.load.root = false;

        state.verified = {
          index: false,
          email: false,
          profile: false,
          agree: false,
          status: "promo",
          access: false,
          demo: false,
          error: "",
        };
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/createProfile/fulfilled"),
      (state, action) => {
        state.verified.email = false;
        state.verified.profile = false;
        state.verified.agree = false;
        state.verified.status = "hold";

        if (action.payload) {
          state.verified.error = action.payload;
        }
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/userPosts/fulfilled"),
      (state) => {
        state.sort.control = false;
      }
    );

    builder.addMatcher(
      (action) =>
        action.type.endsWith("/createPost") ||
        action.type.endsWith("/editPost") ||
        action.type.endsWith("/editProfile") ||
        action.type.endsWith("/addRequest") ||
        action.type.endsWith("/updatePayment") ||
        action.type.endsWith("/updateHome"),
      (state) => reducers.modal(state)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/enableAgree"),
      (state) => {
        state.verified.agree = false;
        reducers.modal(state);
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/addProvider"),
      (state) => {
        state.announce.success = "認証されました";
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/fetchPosts/fulfilled"),
      (state) => {
        state.search.control = true;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/editPost"),
      (state, action) => {
        if (action.payload.post.display === "public") {
          state.search.control = false;
        }
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/fetchUser/pending"),
      (state, action) => {
        state.index =
          action.meta.arg.index !== "companys"
            ? action.meta.arg.index
            : "matters";
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/fetchPost/pending"),
      (state, action) => {
        state.index = action.meta.arg.index;
      }
    );
  },
});

export const {
  handleIndex,
  handleSearch,
  handlePage,
  handleSort,
  handleModal,
  handleAnnounce,
  handleNotFound,
  handleVerified,
} = rootSlice.actions;

export const index = (state) => state.root.index;
export const page = (state) => state.root.page;
export const sort = (state) => state.root.sort;
export const search = (state) => state.root.search;
export const modal = (state) => state.root.modal;
export const announce = (state) => state.root.announce;
export const notFound = (state) => state.root.notFound;
export const data = (state) => state.root.data;
export const verified = (state) => state.root.verified;
export const load = (state) => state.root.load;

export default rootSlice.reducer;
