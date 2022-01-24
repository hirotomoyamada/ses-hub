import firebase from "firebase/app";
import { auth } from "../../../../firebase";

import * as rootSlice from "../../../root/rootSlice";
import * as userSlice from "../../userSlice";

export const handleEmail = async ({
  dispatch,
  methods,
  user,
  setEmail,
  setNext,
  data,
  demo,
}) => {
  const currentUser = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    currentUser.email,
    data.password
  );

  if (!data.email) {
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
  }

  if (data.email && !demo) {
    if (user?.type === "child") {
      throw new dispatch(
        rootSlice.handleAnnounce({
          type: "error",
          text: "このアカウントでは変更できません",
        })
      );
    }

    await currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        currentUser
          .updateEmail(data.email)
          .then(() => {
            setEmail(false);
            setNext(false);

            dispatch(userSlice.changeEmail(data.email));

            auth.currentUser.sendEmailVerification({
              url: `${process.env.REACT_APP_SES_HUB}/login`,
            });

            methods.reset();

            dispatch(
              rootSlice.handleAnnounce({
                type: "success",
                text: "メールドレスを更新しました",
              })
            );
          })
          .catch((e) => {
            dispatch(
              rootSlice.handleAnnounce({
                type: "error",
                text: "メールドレスの更新に失敗しました",
              })
            );
          });
      })
      .catch((e) => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "error",
            text: "パスワードが正しくありません",
          })
        );
      });
  }
};
