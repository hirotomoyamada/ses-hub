import * as reducers from "../reducers/reducers";

export const root = (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/handleIndex"),
    (state, action) => reducers.resetPost(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/handlePage"),
    (state, action) => reducers.resetPost(state, action)
  );
};
