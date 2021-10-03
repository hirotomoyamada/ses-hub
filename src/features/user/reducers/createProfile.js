export const createProfile = (state) => {
  state.verified = {
    email: false,
    profile: false,
    agree: false,
    plan: false,
    status: "hold",
  };
  state.load = false;
};
