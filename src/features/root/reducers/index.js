export const index = (state, action) => {
  state.index = action.payload;

  if (state.page !== "post") {
    state.search.value = "";
    state.search.target = "";
    state.search.type = "";
    state.search.control = false;
  }
};
