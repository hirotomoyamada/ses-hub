export const limit = (state, action) => {
  state.limit = action.payload;
  state.load.root = false;
};
