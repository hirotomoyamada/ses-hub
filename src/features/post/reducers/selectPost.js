export const selectPost = (state, action) => {
  state.post = action.payload;
};
