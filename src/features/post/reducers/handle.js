export const handleSearch = (state, action) => {
  if (!action.payload) {
    state.search.value = "";
    state.search.control = false;
  }

  if (action?.payload?.target) {
    state.search.target = action.payload.target;
    state.search.control = false;
  }

  if (action?.payload?.type) {
    state.search.type = action.payload.type;
    state.search.control = false;
  }

  if (action?.payload?.value) {
    state.search.value = action.payload.value;
    state.search.control = false;
  }

  if (action?.payload?.control) {
    state.search.control = action.payload.control;
  }
};

export const handlePage = (state, action) => {
  if (action.payload === "post" || action.payload === "setting") {
    state.page = action.payload;
  } else {
    if (state.page === "post" || state.page === "setting") {
      state.bests = [];
    } else {
      Object.keys(state).forEach((type) => {
        if (type === "bests") {
          return;
        }

        Object.keys(state[type]).forEach((index) => {
          if (type !== "selectUser") {
            state[type][index].posts = state[type][index].posts.slice(0, 50);
          } else {
            state[type][index].posts = [];
          }
          state[type][index].hit.currentPage = 0;
        });
      });
    }

    state.page = action.payload;
  }
};


