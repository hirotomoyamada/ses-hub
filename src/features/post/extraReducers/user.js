import * as reducers from "../reducers/reducers";

export const user = (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/addLike"),
    (state, action) => reducers.addLike(state, action)
  );
  builder.addMatcher(
    (action) => action.type.endsWith("/removeLike"),
    (state, action) => reducers.removeLike(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/addOutput"),
    (state, action) => reducers.addOutput(state, action)
  );
  builder.addMatcher(
    (action) => action.type.endsWith("/removeOutput"),
    (state, action) => reducers.removeOutput(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/addEntry"),
    (state, action) => reducers.addEntry(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/addFollow"),
    (state, action) => reducers.addFollow(state, action)
  );
  builder.addMatcher(
    (action) => action.type.endsWith("/removeFollow"),
    (state, action) => reducers.removeFollow(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/addRequest"),
    (state, action) => reducers.addRequest(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/updateHome"),
    (state) => reducers.resetControl(state)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/fetchUser/pending"),
    (state, action) => reducers.resetPost(state, action)
  );
  builder.addMatcher(
    (action) => action.type.endsWith("/fetchUser/fulfilled"),
    (state, action) => {
      if (action.payload?.bests) {
        state.bests = action.payload?.bests;
      }
    }
  );
};
