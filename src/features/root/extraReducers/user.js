export const user = (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/createProfile/fulfilled"),
    (state, action) => {
      state.verified.email = false;
      state.verified.profile = false;
      state.verified.agree = false;
      state.verified.status = "hold";

      if (action.payload) {
        state.verified.error = action.payload;
      }
    }
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/fetchUser/pending"),
    (state, action) => {
      state.index =
        action.meta.arg.index !== "companys"
          ? action.meta.arg.index
          : "matters";
    }
  );
};
