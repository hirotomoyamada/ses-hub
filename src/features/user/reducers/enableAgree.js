import { functions } from "../../../firebase";

export const enableAgree = (state) => {
  state.verified.agree = false;

  const enableAgree = functions.httpsCallable("sh-enableAgree");
  enableAgree().catch((e) => {});
};
