export const search = (state, action) => {
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
