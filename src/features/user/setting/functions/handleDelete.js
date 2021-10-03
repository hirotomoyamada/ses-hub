import firebase from "firebase/app";
import { auth } from "../../../../firebase";

import * as userSlice from "../../userSlice";

export const handleDelete = async ({
  dispatch,
  history,
  methods,
  user,
  next,
  setNext,
  data,
  demo,
}) => {
  const currentUser = auth.currentUser;
  const password = user?.provider?.find((provider) => provider === "password");
  const credential =
    password &&
    firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      data.password
    );

  if (!next) {
    await currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        setNext(true);
      })
      .catch((e) => {
        methods.reset();

        dispatch(
          userSlice.handleAnnounce({
            type: "error",
            text: "パスワードが正しくありません",
          })
        );
      });
  } else if (password && !demo) {
    await currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        currentUser
          .delete()
          .then(() => {
            dispatch(
              userSlice.handleAnnounce({
                type: "success",
                text: "アカウントを削除しました",
              })
            );
            history.push("/");
          })
          .catch((e) => {
            dispatch(
              userSlice.handleAnnounce({
                type: "error",
                text: "アカウントの削除に失敗しました",
              })
            );
          });
      })
      .catch((e) => {
        dispatch(
          userSlice.handleAnnounce({
            type: "error",
            text: "アカウントの削除に失敗しました 再度ログインし直してください",
          })
        );
      });
  } else if (!demo) {
    currentUser
      .delete()
      .then(() => {
        dispatch(
          userSlice.handleAnnounce({
            type: "success",
            text: "アカウントを削除しました",
          })
        );
        history.push("/");
      })
      .catch((e) => {
        dispatch(
          userSlice.handleAnnounce({
            type: "error",
            text: "アカウントの削除に失敗しました 再度ログインし直してください",
          })
        );
      });
  }
};
