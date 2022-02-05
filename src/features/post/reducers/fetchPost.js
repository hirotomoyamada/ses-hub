export const fetchPost = (state, action) => {
  if (!action.payload.error) {
    state.post = action.payload.post;
    state.bests = action.payload.bests;
  } else {
    state.post = {};
    state.bests = [];
  }
};
