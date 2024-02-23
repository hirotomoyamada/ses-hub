import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { State, initialState } from 'features/post/initialState';

import * as actions from 'features/post/actions';
import * as reducers from 'features/post/reducers';

import { Request, Like, Output, Entry } from 'features/user/userSlice';
import { FetchUser } from 'features/user/actions';
import { Company } from 'types/post';

export const extraReducers = (builder: ActionReducerMapBuilder<State>): void => {
  builder.addCase(actions.promotionPosts.fulfilled, (state, action) =>
    reducers.promotionPosts(state, action),
  );
  builder.addCase(actions.fetchPosts.fulfilled, (state, action) =>
    reducers.fetchPosts(state, action),
  );
  builder.addCase(actions.userPosts.fulfilled, (state, action) =>
    reducers.userPosts(state, action),
  );
  builder.addCase(actions.homePosts.fulfilled, (state, action) =>
    reducers.homePosts(state, action),
  );
  builder.addCase(actions.extractPosts.fulfilled, (state, action) =>
    reducers.extractPosts(state, action),
  );
  builder.addCase(actions.historyPosts.fulfilled, (state, action) =>
    reducers.historyPosts(state, action),
  );
  builder.addCase(actions.fetchPost.pending, (state, action) => reducers.resetPost(state, action));
  builder.addCase(actions.fetchPost.fulfilled, (state, action) =>
    reducers.fetchPost(state, action),
  );
  builder.addCase(actions.createPost.fulfilled, (state, action) =>
    reducers.createPost(state, action),
  );
  builder.addCase(actions.editPost.fulfilled, (state, action) => reducers.editPost(state, action));
  builder.addCase(actions.deletePost.fulfilled, (state, action) =>
    reducers.deletePost(state, action),
  );
  builder.addCase(actions.fetchActivity.fulfilled, (state, action) =>
    reducers.fetchActivity(state, action),
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/logout'),
    () => {
      return initialState;
    },
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/handleIndex'),
    (state, action: PayloadAction) => reducers.resetPost(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/handlePage'),
    (state, action: PayloadAction<string>) => reducers.resetPost(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/addLike'),
    (state, action: PayloadAction<Like>) => reducers.addLike(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/removeLike'),
    (state, action: PayloadAction<Like>) => reducers.removeLike(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/addOutput'),
    (state, action: PayloadAction<Output>) => reducers.addOutput(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/removeOutput'),
    (state, action: PayloadAction<Output>) => reducers.removeOutput(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/addEntry'),
    (state, action: PayloadAction<Entry>) => reducers.addEntry(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/addFollow'),
    (state, action: PayloadAction<Company>) => reducers.addFollow(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/removeFollow'),
    (state, action: PayloadAction<Company>) => reducers.removeFollow(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/addRequest'),
    (state, action: PayloadAction<Request>) => reducers.addRequest(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/updateHome'),
    (state) => reducers.resetControl(state),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/fetchUser/pending'),
    (state, action: PayloadAction) => reducers.resetPost(state, action),
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/fetchUser/fulfilled'),
    (state, action: PayloadAction<FetchUser['data']>) => {
      if (action.payload?.bests) {
        state.bests = action.payload?.bests;
      }
    },
  );
};
