export const showPost = (state, action) => {
  if (action.payload) {
    state.post = action.payload.post;
    state.bests = action.payload.bests;
  }
};
