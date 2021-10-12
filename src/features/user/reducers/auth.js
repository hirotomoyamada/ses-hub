import { initialState } from "../initialState";

export const login = (state, action) => {
  if (action.payload && action.payload.user) {
    state.user.uid = action.payload.user.uid;
    state.user.icon = action.payload.user.icon;
    state.user.cover = action.payload.user.cover;
    state.user.provider = action.payload.user.provider;
    state.user.profile = action.payload.user.profile;
    state.user.agree = action.payload.user.agree;
    state.user.payment = action.payload.user.payment;
    state.user.createAt = action.payload.user.createAt;
    state.user.updateAt = action.payload.user.updateAt;
    state.user.follows = action.payload.user.follows;
    state.user.home = action.payload.user.home;

    if (action.payload.user.posts) {
      state.user.posts = {
        matters: action.payload.user.posts.matters
          ? action.payload.user.posts.matters
          : [],
        resources: action.payload.user.posts.resources
          ? action.payload.user.posts.resources
          : [],
      };
    }
    if (action.payload.user.entries) {
      state.user.entries = {
        matters: action.payload.user.entries.matters
          ? action.payload.user.entries.matters
          : [],
        resources: action.payload.user.entries.resources
          ? action.payload.user.entries.resources
          : [],
        persons: action.payload.user.entries.persons
          ? action.payload.user.entries.persons
          : [],
      };
    }
    if (action.payload.user.likes) {
      state.user.likes = {
        matters: action.payload.user.likes.matters
          ? action.payload.user.likes.matters
          : [],
        resources: action.payload.user.likes.resources
          ? action.payload.user.likes.resources
          : [],
        persons: action.payload.user.likes.persons
          ? action.payload.user.likes.persons
          : [],
      };
    }
    if (action.payload.user.outputs) {
      state.user.outputs = {
        matters: action.payload.user.outputs.matters
          ? action.payload.user.outputs.matters
          : [],
        resources: action.payload.user.outputs.resources
          ? action.payload.user.outputs.resources
          : [],
      };
    }
  }
};

export const logout = (state) => {
  state = initialState;
};
