import { auth } from "../../../../firebase";
import * as rootSlice from "../../../root/rootSlice";

export const handleResend = async ({ dispatch }) => {
  try {
    await auth.currentUser
      .sendEmailVerification({
        url: "https://ses-hub.app/login",
      })
      .then(() => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "success",
            text: "登録しているメールアドレスに再送信しました",
          })
        );
      })
      .catch((e) => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "error",
            text: "再度時間をおいてください",
          })
        );
      });
  } catch (e) {
    dispatch(
      rootSlice.handleAnnounce({
        type: "error",
        text: "再送信に失敗しました",
      })
    );
  }
};
