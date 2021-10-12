export const sort = (state, action) => {
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
