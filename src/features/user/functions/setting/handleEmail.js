import firebase from "firebase/app";
import { auth } from "../../../../firebase";

import * as rootSlice from "../../../root/rootSlice";
import * as userSlice from "../../userSlice";

export const handleEmail = async ({
  dispatch,
  methods,
  setEmail,
  setNext,
  data,
  demo,
}) => {
  const user = auth.currentUser;
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    data.password
  );

  if (!data.email) {
    await user
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
    await user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updateEmail(data.email)
          .then(() => {
            setEmail(false);
            setNext(false);

            dispatch(userSlice.changeEmail(data.email));

            auth.currentUser.sendEmailVerification({
              url: `${process.env.REACT_APP_URL}/login`,
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
