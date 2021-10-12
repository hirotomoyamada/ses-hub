export const verified = (state, action) => {
  if (action.payload && action.payload.user) {
    state.verified.status = "enable";

    if (action.payload.user.agree === "disable") {
      state.verified.agree = true;
    }

    state.data = action.payload.data;
    state.verified.demo = action.payload.demo;
  }

  if (action.payload && action.payload.emailVerified) {
    state.verified.email = action.payload.emailVerified;
  }

  if (action.payload && action.payload.profileVerified) {
    state.verified.profile = action.payload.profileVerified;
  }

  if (action.payload && action.payload.statusVerified) {
    state.verified.status = action.payload.statusVerified;
    state.verified.access = false;
  }

  state.load.root = false;
};
