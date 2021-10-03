import firebase from "firebase/app";
import { auth } from "../../../../firebase";

import * as userSlice from "../../userSlice";

export const handlePassword = async ({
  dispatch,
  methods,
  setPassword,
  setNext,
  data,
  demo,
}) => {
  const user = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    data.currentPassword
  );
  if (!data.newPassword) {
    await user
      .reauthenticateWithCredential(credential)
      .then(() => {
        setNext(true);
      })
      .catch(() => {
        methods.reset();

        dispatch(
          userSlice.handleAnnounce({
            type: "error",
            text: "パスワードが正しくありません",
          })
        );
      });
  }

  if (data.newPassword && !demo) {
    await user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updatePassword(data.newPassword)
          .then(() => {
            setPassword(false);
            setNext(false);

            methods.reset();

            dispatch(
              userSlice.handleAnnounce({
                type: "success",
                text: "パスワードを更新しました",
              })
            );
          })
          .catch((e) => {
            dispatch(
              userSlice.handleAnnounce({
                type: "error",
                text: "パスワードの更新に失敗しました",
              })
            );
          });
      })
      .catch(() => {
        dispatch(
          userSlice.handleAnnounce({
            type: "error",
            text: "パスワードが正しくありません",
          })
        );
      });
  }
};
