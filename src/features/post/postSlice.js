import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

import { promotionPosts } from "./actions/promotionPosts";
import { fetchPosts } from "./actions/fetchPosts";
import { userPosts } from "./actions/userPosts";
import { homePosts } from "./actions/homePosts";
import { extractPosts } from "./actions/extractPosts";
import { fetchPost } from "./actions/fetchPost";
import { createPost } from "./actions/createPost";

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

  extraReducers: (builder) => {
    builder.addCase(promotionPosts.fulfilled, (state, action) =>
      reducers.promotionPosts(state, action)
    );

    builder.addCase(fetchPosts.fulfilled, (state, action) =>
      reducers.fetchPosts(state, action)
    );

    builder.addCase(userPosts.fulfilled, (state, action) =>
      reducers.userPosts(state, action)
    );

    builder.addCase(homePosts.fulfilled, (state, action) =>
      reducers.homePosts(state, action)
    );

    builder.addCase(extractPosts.fulfilled, (state, action) =>
      reducers.extractPosts(state, action)
    );

    builder.addCase(fetchPost.pending, (state, action) =>
      reducers.resetPost(state, action)
    );

    builder.addCase(fetchPost.fulfilled, (state, action) =>
      reducers.fetchPost(state, action)
    );

    builder.addCase(createPost.fulfilled, (state, action) =>
      reducers.createPost(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/addLike"),
      (state, action) => reducers.addLike(state, action)
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/removeLike"),
      (state, action) => reducers.removeLike(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/addOutput"),
      (state, action) => reducers.addOutput(state, action)
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/removeOutput"),
      (state, action) => reducers.removeOutput(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/addEntry"),
      (state, action) => reducers.addEntry(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/addFollow"),
      (state, action) => reducers.addFollow(state, action)
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/removeFollow"),
      (state, action) => reducers.removeFollow(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/updateHome"),
      (state) => reducers.resetControl(state)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/handleIndex"),
      (state, action) => reducers.resetPost(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/handlePage"),
      (state, action) => reducers.resetPost(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/fetchUser/pending"),
      (state, action) => reducers.resetPost(state, action)
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/fetchUser/fulfilled"),
      (state, action) => {
        if (action.payload?.bests) {
          state.bests = action.payload?.bests;
        }
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/logout"),
      () => {
        return initialState;
      }
    );
  },
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
