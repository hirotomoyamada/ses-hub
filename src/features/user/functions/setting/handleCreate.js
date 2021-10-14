import firebase from "firebase/app";
import { auth } from "../../../../firebase";

import * as rootSlice from "../../../root/rootSlice";
import * as userSlice from "../../userSlice";

export const handleCreate = async ({
  dispatch,
  methods,
  handleCancel,
  data,
}) => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    data.email,
    data.password
  );

  await auth.currentUser
    .linkWithCredential(credential)
    .then((usercred) => {
      dispatch(
        userSlice.addProvider({
          provider: usercred.additionalUserInfo.providerId,
          email: usercred.user.email,
        })
      );
      auth.currentUser.sendEmailVerification({
        url: "https://ses-hub.app/login",
      });

      dispatch(
        rootSlice.handleAnnounce({
          type: "success",
          text: "メールアカウントを作成しました",
        })
      );
    })
    .catch((e) => {
      dispatch(
        rootSlice.handleAnnounce({
          type: "error",
          text: "作成に失敗しました 再度ログインし直してください",
        })
      );
    });
  handleCancel();
  methods.reset();
};
