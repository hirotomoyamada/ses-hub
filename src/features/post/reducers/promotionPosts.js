export const promotionPosts = (state, action) => {
  state.posts.search[action.payload.index].posts = action.payload.posts;

  state.load = false;
};

