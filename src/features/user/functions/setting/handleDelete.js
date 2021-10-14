import firebase from "firebase/app";
import { auth } from "../../../../firebase";

import * as rootSlice from "../../../root/rootSlice";

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
          rootSlice.handleAnnounce({
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
              rootSlice.handleAnnounce({
                type: "success",
                text: "アカウントを削除しました",
              })
            );
            dispatch(rootSlice.handleModal());
            history.push("/");
          })
          .catch((e) => {
            dispatch(
              rootSlice.handleAnnounce({
                type: "error",
                text: "アカウントの削除に失敗しました",
              })
            );
            dispatch(rootSlice.handleModal());
          });
      })
      .catch((e) => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "error",
            text: "アカウントの削除に失敗しました 再度ログインし直してください",
          })
        );
        dispatch(rootSlice.handleModal());
      });
  } else if (!demo) {
    currentUser
      .delete()
      .then(() => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "success",
            text: "アカウントを削除しました",
          })
        );
        dispatch(rootSlice.handleModal());
        history.push("/");
      })
      .catch((e) => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "error",
            text: "アカウントの削除に失敗しました 再度ログインし直してください",
          })
        );
        dispatch(rootSlice.handleModal());
      });
  }
};
