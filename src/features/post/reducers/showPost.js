export const showPost = (state, action) => {
  if (!action.payload.notFound) {
    state.post = action.payload.post;
    state.posts.bests = action.payload.bests;
  } else {
    state.notFound = action.payload.notFound;
  }

  state.load = false;
};
