export const showUser = (state, action) => {
  if (action.payload) {
    state.selectUser = action.payload.user;
  }
};
