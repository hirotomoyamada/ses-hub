export const createPost = (state, action) => {
  if (!action.payload.error) {
    if (action.payload.post.display === "private") {
      if (
        state.user[action.payload.index].posts.length ||
        action.payload.page === "user"
      ) {
        state.user[action.payload.index].posts = [
          action.payload.post,
          ...state.user[action.payload.index].posts,
        ];
      }
    } else {
      if (
        state.user[action.payload.index].posts.length ||
        action.payload.page === "user"
      ) {
        state.user[action.payload.index].posts = [
          action.payload.post,
          ...state.user[action.payload.index].posts,
        ];
      }
      if (
        state.search[action.payload.index].posts.length ||
        action.payload.page === "search"
      ) {
        state.search[action.payload.index].posts = [
          action.payload.post,
          ...state.search[action.payload.index].posts,
        ];
      }
      if (
        state.home[action.payload.index].posts.length ||
        action.payload.page === "home"
      ) {
        state.home[action.payload.index].posts = [
          action.payload.post,
          ...state.home[action.payload.index].posts,
        ];
      }
    }
  }
};
