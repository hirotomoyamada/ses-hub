import * as reducers from "../reducers/reducers";

export const modal = (builder) => {
  builder.addMatcher(
    (action) =>
      action.type.endsWith("/createPost") ||
      action.type.endsWith("/editPost") ||
      action.type.endsWith("/editProfile") ||
      action.type.endsWith("/addRequest") ||
      action.type.endsWith("/updatePayment") ||
      action.type.endsWith("/updateHome"),
    (state) => reducers.modal(state)
  );

  builder.addMatcher(
    (action) =>
      action.type.endsWith("/createChild/fulfilled") ||
      action.type.endsWith("/deleteChild/fulfilled"),
    (state, action) => {
      if (!action.payload.error) {
        reducers.modal(state);
      }
    }
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/enableAgree"),
    (state, action) => {
      state.verified.agree = false;

      if (action.payload.profile?.person) {
        reducers.modal(state);
      } else {
        state.modal.type = "profile";
      }
    }
  );
};
