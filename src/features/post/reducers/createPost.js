export const createPost = (state, action) => {
  if (action.payload) {
    if (action.payload.post.display === "private") {
      if (state.user[action.payload.index].posts.length) {
        state.user[action.payload.index].posts = [
          action.payload.post,
          ...state.user[action.payload.index].posts,
        ];
      }
    } else {
      if (
        state.user[action.payload.index].posts.length ||
        state.page === "user"
      ) {
        state.user[action.payload.index].posts = [
          action.payload.post,
          ...state.user[action.payload.index].posts,
        ];
      }
      if (
        state.search[action.payload.index].posts.length ||
        state.page === "search"
      ) {
        state.search[action.payload.index].posts = [
          action.payload.post,
          ...state.search[action.payload.index].posts,
        ];
      }
      if (
        state.home[action.payload.index].posts.length ||
        state.page === "home"
      ) {
        state.home[action.payload.index].posts = [
          action.payload.post,
          ...state.home[action.payload.index].posts,
        ];
      }
    }
  }

  state.fetch = false;
};
