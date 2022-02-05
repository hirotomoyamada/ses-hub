export const fetchUser = (state, action) => {
  if (!action.payload.error) {
    state.selectUser = action.payload.user;
  } else {
    state.selectUser = {};
  }
};
