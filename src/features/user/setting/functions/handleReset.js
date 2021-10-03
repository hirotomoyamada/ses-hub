import { auth } from "../../../../firebase";

import * as userSlice from "../../userSlice";

export const handleReset = async ({
  dispatch,
  methods,
  setEmail,
  setPassword,
  setNext,
  setReset,
  data,
}) => {
  await auth
    .sendPasswordResetEmail(data.email)
    .then(() => {
      setEmail(false);
      setPassword(false);
      setNext(false);
      setReset(false);

      methods.reset();

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
          text: "メールアドレスが存在しません",
        })
      );
    });
};
