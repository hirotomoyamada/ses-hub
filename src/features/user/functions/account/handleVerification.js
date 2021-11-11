import { auth } from "../../../../firebase";

import * as rootSlice from "../../../root/rootSlice";

export const handleVerification = async ({
  dispatch,
  methods,
  setVerification,
  email,
  password,
}) => {
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      setVerification(true);
    })
    .catch((e) => {
      dispatch(
        rootSlice.handleAnnounce({
          type: "error",
          text: "パスワードが正しくありません",
        })
      );
      methods.reset();
    });
};
