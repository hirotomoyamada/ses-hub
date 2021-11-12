import firebase from "firebase/app";
import { auth } from "../../../../firebase";

import * as userSlice from "../../userSlice";
import * as rootSlice from "../../../root/rootSlice";

export const handleAuth = async ({ dispatch, methods, setAuth, data }) => {
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

      dispatch(
        rootSlice.handleAnnounce({
          type: "error",
          text: "パスワードが正しくありません",
        })
      );
    });
};
