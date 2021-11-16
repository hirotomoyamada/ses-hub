import { auth } from "../../../../firebase";

import * as rootSlice from "../../../root/rootSlice";

export const handleReset = async ({ dispatch, methods, setReset, email }) => {
  await auth
    .sendPasswordResetEmail(email)
    .then(() => {
      setReset && setReset(false);

      methods?.reset();

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
          text: "メールアドレスが存在しません",
        })
      );
    });
};
