export const fetchUser = (state, action) => {
  if (action.payload) {
    state.selectUser = action.payload.user;
  }
};
