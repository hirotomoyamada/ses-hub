import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

import { initialState, State, Analytics } from 'features/user/initialState';

import * as reducers from 'features/user/reducers';
import { extraReducers } from 'features/user/extraReducers';

import { Notice, User } from 'types/user';
import { Matter, Resource, Company, Person } from 'types/post';

export interface Profile {
  icon: string;
  cover: string;
  name: string;
  person: string;
  invoice: { type: string; no: string | undefined } | null;
  body: string | null;
  more: string[];
  region: string[];
  postal: string | null;
  address: string | null;
  tel: string | null;
  url: string | null;
  social: {
    twitter: string | null;
    instagram: string | null;
    line: string | null;
    linkedIn: string | null;
  };
  uid?: string;
}

export interface Provider {
  provider: string;
  email?: string;
}

export interface Like {
  index: 'matters' | 'resources' | 'persons';
  post: Matter | Resource | Person;
}

export interface Output {
  index: 'matters' | 'resources';
  post?: Matter | Resource;
  objectIDs?: string[];
}

export interface Entry {
  index: 'matters' | 'resources';
  post: Matter | Resource;
  proposedPost: Matter | Resource;
}

export interface Request {
  user: Person;
  body: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    logout: (state) => reducers.logout(state),
    resetUser: (state) => reducers.resetUser(state),
    updateToken: (state, action: PayloadAction<string | undefined>) =>
      reducers.updateToken(state, action),
    updateNotice: (state, action: PayloadAction<{ type: 'user' | 'payment'; notice?: Notice }>) =>
      reducers.updateNotice(state, action),
    updatePayment: (state, action: PayloadAction<User['payment']>) =>
      reducers.updatePayment(state, action),
    addProvider: (state, action: PayloadAction<Provider>) => reducers.addProvider(state, action),
    changeEmail: (state, action: PayloadAction<string>) => reducers.changeEmail(state, action),
    applicationType: (state) => reducers.applicationType(state),
    addLike: (state, action: PayloadAction<Like>) => reducers.addLike(state, action),
    removeLike: (state, action: PayloadAction<Like>) => reducers.removeLike(state, action),
    addOutput: (state, action: PayloadAction<Output>) => reducers.addOutput(state, action),
    removeOutput: (state, action: PayloadAction<Output>) => reducers.removeOutput(state, action),
    addEntry: (state, action: PayloadAction<Entry>) => reducers.addEntry(state, action),
    addFollow: (state, action: PayloadAction<Company>) => reducers.addFollow(state, action),
    removeFollow: (state, action: PayloadAction<Company>) => reducers.removeFollow(state, action),
    addRequest: (state, action: PayloadAction<Request>) => reducers.addRequest(state, action),
    updateHome: (state, action: PayloadAction<string[]>) => reducers.updateHome(state, action),
  },

  extraReducers: (builder) => extraReducers(builder),
});

export const {
  logout,
  updateToken,
  resetUser,
  updateNotice,
  updatePayment,
  addProvider,
  changeEmail,
  applicationType,
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

export const user = (state: RootState): User => state.user.user as User;
export const token = (state: RootState): State['token'] => state.user.token;
export const selectUser = (state: RootState): Company | Person | (Company | Person)[] =>
  state.user.selectUser as Company | Person | (Company | Person)[];
export const analytics = (state: RootState): { [key: string]: Analytics } =>
  state.user.analytics as { [key: string]: Analytics };

export default userSlice.reducer;
