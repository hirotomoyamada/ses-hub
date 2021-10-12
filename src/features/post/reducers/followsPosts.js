export const followsPosts = (state, action) => {
  if (action.payload) {
    if (action.payload.hit.currentPage !== 0) {
      state.home[action.payload.index].posts = [
        ...state.home[action.payload.index].posts,
        ...action.payload.posts,
      ];
    } else {
      state.home[action.payload.index].posts = action.payload.posts;
    }
    state.home[action.payload.index].hit = {
      posts: action.payload.hit.posts,
      pages: action.payload.hit.pages,
      currentPage: action.payload.hit.currentPage,
    };
    state.home[action.payload.index].control = false;
  }
  state.fetch = false;
  state.load = false;
};
