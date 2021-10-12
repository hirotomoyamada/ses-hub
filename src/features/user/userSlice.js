import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

import { login } from "./functions/login";
import { showUser } from "./functions/showUser";

import * as reducers from "./reducers/redurces";

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: () => {
      return initialState;
    },

    resetUser: (state) => reducers.resetUser(state),

    editProfile: (state, action) => reducers.editProfile(state, action),
    enableAgree: (state) => reducers.enableAgree(state),
    updatePayment: (state, action) => reducers.updatePayment(state, action),
    addProvider: (state, action) => reducers.addProvider(state, action),
    changeEmail: (state, action) => reducers.changeEmail(state, action),

    addLike: (state, action) => reducers.addLike(state, action),
    removeLike: (state, action) => reducers.removeLike(state, action),
    addOutput: (state, action) => reducers.addOutput(state, action),
    removeOutput: (state, action) => reducers.removeOutput(state, action),
    addEntry: (state, action) => reducers.addEntry(state, action),
    addFollow: (state, action) => reducers.addFollow(state, action),
    removeFollow: (state, action) => reducers.removeFollow(state, action),
    updateHome: (state, action) => reducers.updateHome(state, action),
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) =>
      reducers.login(state, action)
    );

    builder.addCase(showUser.fulfilled, (state, action) =>
      reducers.showUser(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/createPost/fulfilled"),
      (state, action) => reducers.createPost(state, action)
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/deletePost"),
      (state, action) => reducers.deletePost(state, action)
    );
  },
});

export const {
  logout,

  resetUser,

  editProfile,
  enableAgree,
  updatePayment,
  addProvider,
  changeEmail,

  addLike,
  removeLike,
  addOutput,
  removeOutput,
  addEntry,
  addFollow,
  removeFollow,
  updateHome,
} = userSlice.actions;

export const user = (state) => state.user.user;

export const selectUser = (state) => state.user.selectUser;

export default userSlice.reducer;
