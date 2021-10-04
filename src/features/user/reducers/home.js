import { functions } from "../../../firebase";

export const updateHome = (state, action) => {
  state.user.home = action.payload;

  const updateHome = functions.httpsCallable("sh-updateHome");
  updateHome({ uids: action.payload }).catch((e) => {});
};
