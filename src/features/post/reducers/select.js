export const selectIndex = (state, action) => {
  state.index = action.payload;

  if (!(state.page === "post" || state.page === "setting")) {
    state.search.value = "";
    state.search.target = "";
    state.search.type = "";
    state.search.control = false;

    Object.keys(state.posts).forEach((type) => {
      if (type === "bests") {
        return;
      }

      Object.keys(state.posts[type]).forEach((index) => {
        state.posts[type][index].posts = state.posts[type][index].posts.slice(
          0,
          50
        );
        state.posts[type][index].hit.currentPage = 0;
      });
    });
  }
};

export const selectPost = (state, action) => {
  state.post = action.payload;
};
