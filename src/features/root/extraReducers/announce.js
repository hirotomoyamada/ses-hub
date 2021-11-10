export const announce = (builder) => {
  builder.addMatcher(
    (action) =>
      action.type.endsWith("/createPost/fulfilled") ||
      action.type.endsWith("/fetchPosts/fulfilled") ||
      action.type.endsWith("/extractPosts/fulfilled") ||
      action.type.endsWith("/homePosts/fulfilled") ||
      action.type.endsWith("/promotionPosts/fulfilled") ||
      action.type.endsWith("/userPosts/fulfilled") ||
      action.type.endsWith("/fetchProducts/fulfilled"),
    (state, action) => {
      if (action.payload.error) {
        state.announce.error = action.payload.error;
      }
    }
  );
};
