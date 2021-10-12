import { functions } from "../../../firebase";

export const enableAgree = (state) => {
  const enableAgree = functions.httpsCallable("sh-enableAgree");
  enableAgree().catch((e) => {});
};
