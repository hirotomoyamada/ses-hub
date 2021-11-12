export const createChild = (state, action) => {
  if (!action.payload.error) {
    state.user.payment.children = [
      ...state.user.payment.children,
      action.payload.uid,
    ];
    if (state.selectUser?.length) {
      state.selectUser = [...state.selectUser, action.payload];
    } else {
      state.selectUser = [action.payload];
    }
  }
};
