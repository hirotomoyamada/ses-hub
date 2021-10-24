import { auth } from "../../../../firebase";
import * as rootSlice from "../../../root/rootSlice";

export const handleResend = async ({ dispatch }) => {
  await auth.currentUser
    .sendEmailVerification({
      url: `${process.env.REACT_APP_URL}/login`,
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
};
