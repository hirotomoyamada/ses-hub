export const fetchPost = (state, action) => {
  if (action.payload) {
    state.post = action.payload.post;
    state.bests = action.payload.bests;
  }
};
