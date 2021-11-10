import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

import * as reducers from "./reducers/reducers";

export const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    selectPost: (state, action) => reducers.selectPost(state, action),
    editPost: (state, action) => reducers.editPost(state, action),
    deletePost: (state, action) => reducers.deletePost(state, action),
    resetPost: (state, action) => reducers.resetPost(state, action),
  },

  extraReducers: (builder) => {},
});

export const { selectPost, editPost, deletePost, resetPost } =
  postSlice.actions;

export const posts = ({ state, page, index }) =>
  page && page !== "bests"
    ? state.post?.[page]?.[index]?.posts
    : state.post.bests;

export const hit = ({ state, page, index }) =>
  page && state.post?.[page]?.[index]?.hit;

export const control = ({ state, index }) => state.post.home[index].control;

export const post = (state) => state.post.post;

export const bests = (state) => state.post.bests;

export default postSlice.reducer;
