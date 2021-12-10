export const verified = (state, action) => {
  if (action.payload && action.payload.user) {
    state.verified.status = "enable";

    if (!action.payload.user.profile?.person) {
      state.modal.type = "profile";
      state.modal.open = true;
    }

    if (
      action.payload.user.payment.status === "canceled" &&
      action.payload.user.payment.notice &&
      action.payload.user.type !== "child"
    ) {
      state.modal.type = "advertise";
      state.modal.open = true;
    }

    if (action.payload.user.agree === "disable") {
      state.verified.agree = true;

      state.modal.type = "agree";
      state.modal.open = true;
    }

    state.data = action.payload.data;
    state.verified.demo = action.payload.demo;
    state.verified.payment = action.payload.user.payment.status;
  }

  if (action.payload && state.verified.demo) {
    state.modal.type = "demo";
    state.modal.open = true;
  }

  if (action.payload && action.payload === "reset") {
    state.verified = {
      index: false,
      email: false,
      profile: true,
      agree: false,
      status: "",
      access: false,
      demo: false,
      error: "",
    };
  }

  if (action.payload && action.payload.emailVerified) {
    state.verified.email = action.payload.emailVerified;
    state.verified.access = false;
  }

  if (action.payload && action.payload.profileVerified) {
    state.verified.profile = action.payload.profileVerified;
    state.verified.access = false;
  }

  if (action.payload && action.payload.statusVerified) {
    state.verified.status = action.payload.statusVerified;
    state.verified.access = false;
  }

  state.load.root = false;
};
