export const resetPost = (state, action) => {
  if (action.payload === "selectUser") {
    state.selectUser.matters.posts = [];
    state.selectUser.resources.posts = [];
  } else {
    state.post = {};
  }
};

export const resetControl = (state) => {
  state.home.matters.control = true;
  state.home.resources.control = true;
};
