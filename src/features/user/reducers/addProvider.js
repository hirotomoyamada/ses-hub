import { functions } from "../../../firebase";

export const addProvider = (state, action) => {
  state.user.provider = [action.payload.provider, ...state.user.provider];

  if (action.payload.email) {
    state.user.profile.email = action.payload.email;
  }

  const addProvider = functions.httpsCallable("sh-addProvider");
  addProvider({
    provider: action.payload.provider,
    email: action.payload.email,
  }).catch((e) => {});

  state.announce.success = "認証されました";
};
