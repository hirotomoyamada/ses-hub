import * as reducers from "../reducers/reducers";

export const modal = (builder) => {
  builder.addMatcher(
    (action) =>
      action.type.endsWith("/createPost") ||
      action.type.endsWith("/editPost") ||
      action.type.endsWith("/editProfile") ||
      action.type.endsWith("/addRequest") ||
      action.type.endsWith("/updatePayment") ||
      action.type.endsWith("/resetUser") ||
      action.type.endsWith("/createChild/fulfilled") ||
      action.type.endsWith("/updateHome"),
    (state) => reducers.modal(state)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/enableAgree"),
    (state) => {
      state.verified.agree = false;
      reducers.modal(state);
    }
  );
};
