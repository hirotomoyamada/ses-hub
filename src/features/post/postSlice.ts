import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

import * as reducers from "features/post/reducers";
import { extraReducers } from "features/post/extraReducers";

import { initialState, State } from "features/post/initialState";
import { Matter, Resource, Company, Person } from "types/post";

export interface Post {
  index: "matters" | "resources";
  post: Matter | Resource;
}

export const postSlice = createSlice({
  name: "post",
  initialState,

  reducers: {
    selectPost: (state, action: PayloadAction<Post["post"]>) =>
      reducers.selectPost(state, action),
    editPost: (state, action: PayloadAction<Post>) =>
      reducers.editPost(state, action),
    deletePost: (state, action: PayloadAction<Post>) =>
      reducers.deletePost(state, action),
    resetPost: (state, action: PayloadAction) =>
      reducers.resetPost(state, action),
  },

  extraReducers: (builder) => extraReducers(builder),
});

export const { selectPost, editPost, deletePost, resetPost } =
  postSlice.actions;

export const posts = ({
  state,
  index,
  page,
}: {
  state: RootState;
  index: "matters" | "resources" | "companys" | "persons";
  page?:
    | "home"
    | "search"
    | "likes"
    | "outputs"
    | "entries"
    | "user"
    | "selectUser"
    | "bests";
}): Matter[] | Resource[] | Company[] | Person[] | undefined => {
  if (page) {
    if (page === "search") {
      return state.post.search[index].posts;
    }

    if (page === "user" && index !== "persons") {
      return state.post.user[index].posts;
    }

    if ((page === "likes" || page === "entries") && index !== "companys") {
      return state.post[page][index].posts;
    }

    if (
      (page === "selectUser" || page === "outputs" || page === "home") &&
      index !== "companys" &&
      index !== "persons"
    ) {
      return state.post[page][index].posts;
    }

    if (page === "bests") {
      return state.post.bests;
    }
  }
};

export const hit = ({
  state,
  index,
  page,
}: {
  state: RootState;
  index: "matters" | "resources" | "companys" | "persons";
  page?:
    | "home"
    | "search"
    | "likes"
    | "outputs"
    | "entries"
    | "user"
    | "selectUser"
    | "bests";
}):
  | {
      posts: number;
      pages: number;
      currentPage: number;
    }
  | undefined => {
  if (page) {
    if (page === "search") {
      return state.post.search[index].hit;
    }

    if (page === "user" && index !== "persons") {
      return state.post.user[index].hit;
    }

    if ((page === "likes" || page === "entries") && index !== "companys") {
      return state.post[page][index].hit;
    }

    if (
      (page === "selectUser" || page === "outputs" || page === "home") &&
      index !== "companys" &&
      index !== "persons"
    ) {
      return state.post[page][index].hit;
    }
  }
};

export const control = ({
  state,
  index,
}: {
  state: RootState;
  index: "matters" | "resources";
}): boolean => state.post.home[index].control;

export const post = (state: RootState): State["post"] => state.post.post;
export const bests = (state: RootState): State["bests"] => state.post.bests;

export default postSlice.reducer;
