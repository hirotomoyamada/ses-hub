export const resetPost = (state, action) => {
  if (action.payload === "selectUser") {
    state.posts.selectUser.matters.posts = [];
    state.posts.selectUser.resources.posts = [];
  } else {
    state.post = {};
  }
};
