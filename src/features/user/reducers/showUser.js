export const showUser = (state, action) => {
  if (!action.payload.notFound) {
    state.selectUser = action.payload.user;
  } else {
    state.notFound = action.payload.notFound;
  }
};
