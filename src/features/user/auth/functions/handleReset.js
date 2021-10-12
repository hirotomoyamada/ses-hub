import { auth } from "../../../../firebase";

import * as rootSlice from "../../../root/rootSlice";

export const handleReset = async ({ dispatch, reset, setReset, data }) => {
  try {
    await auth.sendPasswordResetEmail(data.reset).then(() => {
      setReset(!reset);
      dispatch(
        rootSlice.handleAnnounce({
          type: "success",
          text: "再設定メールを送信しました",
        })
      );
    });
  } catch (e) {
    dispatch(
      rootSlice.handleAnnounce({
        type: "error",
        text: "メールアドレスが存在しません",
      })
    );
  }
};
