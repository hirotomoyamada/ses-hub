import { login } from "../actions/login";
import { fetchUser } from "../actions/fetchUser";

import * as reducers from "../reducers/redurces";

export const extraReducers = (builder) => {
  builder.addCase(login.fulfilled, (state, action) =>
    reducers.login(state, action)
  );

  builder.addCase(fetchUser.fulfilled, (state, action) =>
    reducers.fetchUser(state, action)
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
