import { initialState } from "../initialState";

export const auth = (builder) => {
  builder.addMatcher(
    (action) => action.type.endsWith("/logout"),
    () => {
      return initialState;
    }
  );
};
