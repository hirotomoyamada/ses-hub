export const resetPost = (state, action) => {
  if (action.type !== "user/showUser/pending") {
    if (action.payload) {
      if (action.payload !== "post") {
        if (Object.keys(state.post).length) {
          state.post = {};
          state.bests = [];
        } else {
          Object.keys(state).forEach((type) => {
            if (type === "bests" || type === "post") {
              return;
            }

            Object.keys(state[type]).forEach((index) => {
              state[type][index].posts = state[type][index].posts.slice(0, 50);
              state[type][index].hit.currentPage = 0;
            });
          });
        }
      }
    } else {
      state.post = {};
      state.bests = [];
    }
  } else {
    state.selectUser.matters.posts = [];
    state.selectUser.matters.hit.currentPage = 0;
    state.selectUser.resources.posts = [];
    state.selectUser.resources.hit.currentPage = 0;
  }
};

export const resetControl = (state) => {
  state.home.matters.control = true;
  state.home.resources.control = true;
};
