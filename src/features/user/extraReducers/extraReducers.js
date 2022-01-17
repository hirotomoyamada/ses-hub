import { login } from "../actions/login";
import { fetchUser } from "../actions/fetchUser";
import { createChild } from "../actions/createChild";
import { changeEmailChild } from "../actions/changeEmailChild";
import { deleteChild } from "../actions/deleteChild";

import * as reducers from "../reducers/redurces";

export const extraReducers = (builder) => {
  builder.addCase(login.fulfilled, (state, action) => {
    if (!state.token) {
      reducers.login(state, action);
    }
  });

  builder.addCase(fetchUser.fulfilled, (state, action) =>
    reducers.fetchUser(state, action)
  );

  builder.addCase(createChild.fulfilled, (state, action) =>
    reducers.createChild(state, action)
  );

  builder.addCase(changeEmailChild.fulfilled, (state, action) =>
    reducers.changeEmailChild(state, action)
  );

  builder.addCase(deleteChild.fulfilled, (state, action) =>
    reducers.deleteChild(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/createPost/fulfilled"),
    (state, action) => reducers.createPost(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/deletePost"),
    (state, action) => reducers.deletePost(state, action)
  );
};
