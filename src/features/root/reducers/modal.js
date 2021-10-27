export const modal = (state, action) => {
  if (action?.payload) {
    state.modal.type = action.payload.type;
    state.modal.text = action.payload.text;
    state.modal.close = action.payload.close;
    state.modal.delete = action.payload.delete;
    state.modal.open = true;
  } else {
    state.modal.type = "";
    state.modal.text = "";
    state.modal.close = null;
    state.modal.delete = null;
    state.modal.open = false;
  }
};
