import { auth } from "../../../../firebase";

import * as userSlice from "../../userSlice";

export const handleResend = async ({ dispatch }) => {
  try {
    await auth.currentUser
      .sendEmailVerification({
        url: "https://ses-hub.app/login",
      })
      .then(() => {
        dispatch(
          userSlice.handleAnnounce({
            type: "success",
            text: "登録しているメールアドレスに再送信しました",
          })
        );
      })
      .catch((e) => {
        dispatch(
          userSlice.handleAnnounce({
            type: "error",
            text: "再度時間をおいてください",
          })
        );
      });
  } catch (e) {
    dispatch(
      userSlice.handleAnnounce({
        type: "error",
        text: "再送信に失敗しました",
      })
    );
  }
};
