export const announce = (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/addProvider"),
    (state) => {
      state.announce.success = "認証されました";
    }
  );
};
