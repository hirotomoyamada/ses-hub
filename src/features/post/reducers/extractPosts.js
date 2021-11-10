export const extractPosts = (state, action) => {
  if (!action.payload.error) {
    if (action.payload.hit.currentPage !== 0 && action.payload.hit.pages > 1) {
      state[action.payload.type][action.payload.index].posts = [
        ...state[action.payload.type][action.payload.index].posts,
        ...action.payload.posts,
      ];
    } else {
      state[action.payload.type][action.payload.index].posts =
        action.payload.posts;
    }

    state[action.payload.type][action.payload.index].hit = {
      posts: action.payload.hit.posts,
      pages: action.payload.hit.pages,
      currentPage: action.payload.hit.currentPage,
    };
  }
};
