import { auth } from "../../../../firebase";

import * as userSlice from "../../userSlice";

export const handleReset = async ({ dispatch, reset, setReset, data }) => {
  try {
    await auth.sendPasswordResetEmail(data.reset).then(() => {
      setReset(!reset);
      dispatch(
        userSlice.handleAnnounce({
          type: "success",
          text: "再設定メールを送信しました",
        })
      );
    });
  } catch (e) {
    dispatch(
      userSlice.handleAnnounce({
        type: "error",
        text: "メールアドレスが存在しません",
      })
    );
  }
};
