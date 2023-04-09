import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';
import { State } from 'features/user/initialState';
import { Post } from 'features/post/postSlice';
import { CreatePost } from 'features/post/actions';
import { Setting, User } from 'types/user';

import * as actions from 'features/user/actions';
import * as reducers from 'features/user/reducers';

export const extraReducers = (
  builder: ActionReducerMapBuilder<State>,
): void => {
  builder.addCase(actions.login.fulfilled, (state, action) => {
    if (!state.token) {
      reducers.login(state, action);
    }
  });

  builder.addCase(actions.editProfile.fulfilled, (state, action) =>
    reducers.editProfile(state, action),
  );

  builder.addCase(actions.fetchUser.fulfilled, (state, action) =>
    reducers.fetchUser(state, action),
  );

  builder.addCase(actions.createChild.fulfilled, (state, action) =>
    reducers.createChild(state, action),
  );

  builder.addCase(actions.changeEmailChild.fulfilled, (state, action) =>
    reducers.changeEmailChild(state, action),
  );

  builder.addCase(actions.deleteChild.fulfilled, (state, action) =>
    reducers.deleteChild(state, action),
  );

  builder.addCase(actions.fetchAnalytics.fulfilled, (state, action) =>
    reducers.fetchAnalytics(state, action),
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/createPost/fulfilled'),
    (state, action: PayloadAction<CreatePost['data']>) =>
      reducers.createPost(state, action),
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/deletePost'),
    (state, action: PayloadAction<Post>) => reducers.deletePost(state, action),
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/handleAgree'),
    (state) => {
      (state.user as User).agree = 'enalble';
    },
  );
  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/handleRemind'),
    (state) => {
      if ((state.user as User).remind) {
        (state.user as Required<User>).remind.app = 'disable';
      }
    },
  );

  builder.addMatcher(
    (action: PayloadAction) => action.type.endsWith('/handleSetting'),
    (
      state,
      action: PayloadAction<Setting['analytics'] & { type: 'analytics' }>,
    ) => reducers.updateAnalytics(state, action),
  );
};
