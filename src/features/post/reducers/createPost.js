export const createPost = (state, action) => {
  if (action.payload) {
    if (action.payload.post.display === "private") {
      if (state.posts.user[action.payload.index].posts.length) {
        state.posts.user[action.payload.index].posts = [
          action.payload.post,
          ...state.posts.user[action.payload.index].posts,
        ];
      }
    } else {
      if (
        state.posts.user[action.payload.index].posts.length ||
        state.page === "user"
      ) {
        state.posts.user[action.payload.index].posts = [
          action.payload.post,
          ...state.posts.user[action.payload.index].posts,
        ];
      }
      if (
        state.posts.search[action.payload.index].posts.length ||
        state.page === "search"
      ) {
        state.posts.search[action.payload.index].posts = [
          action.payload.post,
          ...state.posts.search[action.payload.index].posts,
        ];
      }
      if (
        state.posts.home[action.payload.index].posts.length ||
        state.page === "home"
      ) {
        state.posts.home[action.payload.index].posts = [
          action.payload.post,
          ...state.posts.home[action.payload.index].posts,
        ];
      }
    }
  }

  state.fetch = false;
};
