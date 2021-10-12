import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

import { promotionPosts } from "./functions/promotionPosts";
import { fetchPosts } from "./functions/fetchPosts";
import { userPosts } from "./functions/userPosts";
import { followsPosts } from "./functions/followsPosts";
import { extractPosts } from "./functions/extractPosts";
import { showPost } from "./functions/showPost";
import { createPost } from "./functions/createPost";

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

    builder.addCase(followsPosts.fulfilled, (state, action) =>
      reducers.followsPosts(state, action)
    );

    builder.addCase(extractPosts.fulfilled, (state, action) =>
      reducers.extractPosts(state, action)
    );

    builder.addCase(showPost.fulfilled, (state, action) =>
      reducers.showPost(state, action)
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

    // builder.addMatcher(
    //   (action) => action.type.endsWith("/updateHome"),
    //   (state) => reducers.resetControl(state)
    // );

    // builder.addMatcher(
    //   (action) => action.type.endsWith("/handleIndex"),
    //   (state, action) => reducers.resetPost(state, action)
    // );

    // builder.addMatcher(
    //   (action) => action.type.endsWith("/handlePage"),
    //   (state, action) => reducers.resetPost(state, action)
    // );
  },
});

export const { selectPost, editPost, deletePost, resetPost } =
  postSlice.actions;

export const posts = ({ state, page, index }) =>
  page && state.post[page][index].posts;

export const hit = ({ state, page, index }) =>
  page && state.post[page][index].hit;

export const control = ({ state, index }) => state.post.home[index].control;

export const post = (state) => state.post.post;

export const bests = (state) => state.post.bests;

export default postSlice.reducer;
