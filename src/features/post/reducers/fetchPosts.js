export const fetchPosts = (state, action) => {
  if (action.payload) {
    if (action.payload.hit.currentPage !== 0 && action.payload.hit.pages > 1) {
      state.posts.search[action.payload.index].posts = [
        ...state.posts.search[action.payload.index].posts,
        ...action.payload.posts,
      ];
    } else {
      state.posts.search[action.payload.index].posts = action.payload.posts;
    }

    state.posts.search[action.payload.index].hit = {
      posts: action.payload.hit.posts,
      pages: action.payload.hit.pages,
      currentPage: action.payload.hit.currentPage,
    };
  }

  state.load = false;
  state.fetch = false;
};
