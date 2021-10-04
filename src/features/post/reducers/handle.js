export const handleSearch = (state, action) => {
  if (!action.payload) {
    state.search.value = "";
    state.search.control = false;
  }

  if (action?.payload?.target) {
    state.search.control = false;
    state.search.target = action.payload.target;
  }

  if (action?.payload?.type) {
    state.search.control = false;
    state.search.type = action.payload.type;
  }

  if (action?.payload?.value) {
    state.search.control = false;
    state.search.value = action.payload.value;
  }

  if (action?.payload?.control) {
    state.search.control = action.payload.control;
  }
};

export const handleSort = (state, action) => {
  state.sort.status = action.payload.status
    ? action.payload.status !== "reset"
      ? action.payload.status
      : ""
    : state.sort.status;

  state.sort.display = action.payload.display
    ? action.payload.display !== "reset"
      ? action.payload.display
      : ""
    : state.sort.display;

  state.sort.control = true;
};

export const handlePage = (state, action) => {
  if (action.payload === "post" || action.payload === "setting") {
    state.page = action.payload;
  } else {
    if (state.page === "post" || state.page === "setting") {
      state.posts.bests = [];
    } else {
      Object.keys(state.posts).forEach((type) => {
        if (type === "bests") {
          return;
        }

        Object.keys(state.posts[type]).forEach((index) => {
          if (type !== "selectUser") {
            state.posts[type][index].posts = state.posts[type][
              index
            ].posts.slice(0, 50);
          } else {
            state.posts[type][index].posts = [];
          }
          state.posts[type][index].hit.currentPage = 0;
        });
      });
    }

    state.page = action.payload;
  }
};

export const handleModal = (state, action) => {
  document.body.classList.toggle("lock");
  state.modal.type = action.payload.type;
  state.modal.open = action.payload.open;
};

export const handleNotFound = (state, action) => {
  state.notFound = action.payload;
  state.load = false;
};

export const handleControl = (state) => {
  state.posts.home.matters.control = true;
  state.posts.home.resources.control = true;
};
