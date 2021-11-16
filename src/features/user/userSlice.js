import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState";

import * as reducers from "./reducers/redurces";
import { extraReducers } from "./extraReducers/extraReducers";

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      if (!state.token) {
        return initialState;
      }
    },

    resetUser: (state) => reducers.resetUser(state),

    updateToken: (state, action) => reducers.updateToken(state, action),

    editProfile: (state, action) => reducers.editProfile(state, action),
    enableAgree: (state, action) => reducers.enableAgree(state, action),
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
    addRequest: (state, action) => reducers.addRequest(state, action),
    updateHome: (state, action) => reducers.updateHome(state, action),
  },

  extraReducers: (builder) => extraReducers(builder),
});

export const {
  logout,

  updateToken,

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
  addRequest,
  updateHome,
} = userSlice.actions;

export const user = (state) => state.user.user;
export const token = (state) => state.user.token;

export const selectUser = (state) => state.user.selectUser;

export default userSlice.reducer;
