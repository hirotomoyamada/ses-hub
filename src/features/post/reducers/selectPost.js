export const handleIndex = (state, action) => {
  state.index = action.payload;

  if (!(state.page === "post" || state.page === "setting")) {
    state.search.value = "";
    state.search.target = "";
    state.search.type = "";
    state.search.control = false;

    Object.keys(state).forEach((type) => {
      if (type === "bests") {
        return;
      }

      Object.keys(state[type]).forEach((index) => {
        state[type][index].posts = state[type][index].posts.slice(0, 50);
        state[type][index].hit.currentPage = 0;
      });
    });
  }
};

export const selectPost = (state, action) => {
  state.post = action.payload;
};
