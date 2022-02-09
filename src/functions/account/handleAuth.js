import firebase from "firebase/app";
import { auth } from "../../firebase";

import * as userSlice from "../../features/user/userSlice";
import * as rootSlice from "../../features/root/rootSlice";

export const handleAuth = async ({
  dispatch,
  methods,
  history,
  setAuth,
  data,
}) => {
  const user = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    data.password
  );

  await user
    .reauthenticateWithCredential(credential)
    .then(() => {
      setAuth(false);

      dispatch(userSlice.updateToken(data.password));
    })
    .catch((e) => {
      methods.reset();
      history?.replace();

      dispatch(
        rootSlice.handleAnnounce({
          type: "error",
          text: "パスワードが正しくありません",
        })
      );
    });
};
