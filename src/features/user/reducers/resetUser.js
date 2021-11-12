export const resetUser = (state, action) => {
  if (!action.payload) {
    state.selectUser = {};
  } else {
    state.user.payment.children = state.user.payment.children.filter(
      (uid) => uid !== action.payload
    );
    state.selectUser = state.selectUser.filter(
      (user) => user.uid !== action.payload
    );
  }
};
