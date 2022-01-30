import { functions } from "../../../firebase";

export const applicationType = (state) => {
  state.user.application = true;

  const addEntry = functions.httpsCallable("sh-applicationType");
  addEntry().catch((e) => {});
};
