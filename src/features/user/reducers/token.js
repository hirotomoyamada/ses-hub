export const updateToken = (state, action) => {
  if (action.payload) {
    state.token = window.btoa(action.payload);
  } else {
    state.token = null;
  }
};
