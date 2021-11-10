import * as reducers from "../reducers/reducers";

export const auth = (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/login/fulfilled"),
    (state, action) => reducers.verified(state, action)
  );

  builder.addMatcher(
    (action) => action.type.endsWith("/logout"),
    (state) => {
      state.load.root = false;

      state.verified = {
        index: false,
        email: false,
        profile: false,
        agree: false,
        status: "promo",
        access: false,
        demo: false,
        error: "",
      };
    }
  );
};
