export const notFound = (state, action) => {
  state.notFound = action.payload;
  state.load.root = false;
};