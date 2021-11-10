export const promotionPosts = (state, action) => {
  if (!action.payload.error) {
    state.search[action.payload.index].posts = action.payload.posts;
  }
};
