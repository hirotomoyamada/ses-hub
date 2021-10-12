export const promotionPosts = (state, action) => {
  state.search[action.payload.index].posts = action.payload.posts;
};
