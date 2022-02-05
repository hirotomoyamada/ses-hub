export const load = (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/pending"),
    (state, action) => {
      state.load.fetch =
        action.meta.arg.fetch || action.type === "post/createPost/pending"
          ? true
          : false;

      if (action.type !== "post/createPost/pending") {
        if (
          action.type !== "user/createChild/pending" &&
          action.type !== "user/changeEmailChild/pending" &&
          action.type !== "user/deleteChild/pending"
        ) {
          state.load.list = true;
        } else {
          state.load.create = true;
        }
      }
    }
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/rejected"),
    (state) => {
      state.load.fetch = false;
      state.load.list = false;
      state.load.create = false;
    }
  );

  builder.addMatcher(
    (action) =>
      action.type.endsWith("/fulfilled") &&
      action.type !== "user/login/fulfilled",
    (state, action) => {
      if (action.payload?.error === "notFound") {
        state.notFound = true;
      }
      if (action.payload?.error === "limit") {
        state.limit = true;
      }

      state.load.fetch = false;
      state.load.list = false;
      state.load.create = false;
    }
  );
};
