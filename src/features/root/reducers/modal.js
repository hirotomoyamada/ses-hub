export const modal = (state, action) => {
  document.body.classList.toggle("lock");

  if (action.payload) {
    state.modal.type = action.payload;
    state.modal.open = true;
  } else {
    state.modal.type = "";
    state.modal.open = false;
  }
};
