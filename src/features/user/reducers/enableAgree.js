import { functions } from "../../../firebase";

export const enableAgree = (state) => {
  state.agree = "enalble";

  const enableAgree = functions.httpsCallable("sh-enableAgree");
  enableAgree()
    .then(() => {
      window.location.reload();
    })
    .catch((e) => {});
};
