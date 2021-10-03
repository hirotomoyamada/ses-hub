export const handleAnnounce = (state, action) => {
  if (action.payload === "reset") {
    state.announce = {
      success: "",
      error: "",
    };
  } else {
    state.announce[action.payload.type] = action.payload.text;
  }
};

export const handleModal = (state, action) => {
  document.body.classList.toggle("lock");
  state.modal.type = action.payload.type;
  state.modal.open = action.payload.open;
};

export const handleNotFound = (state, action) => {
  state.notFound = action.payload;
};
