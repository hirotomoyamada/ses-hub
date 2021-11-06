import { functions } from "../../../firebase";

export const changeEmail = (state, action) => {
  state.user.profile.email = action.payload;

  const changeEmail = functions.httpsCallable("sh-changeEmail");
  changeEmail(action.payload).catch((e) => {});
};
