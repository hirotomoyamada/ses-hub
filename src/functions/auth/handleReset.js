import { auth, functions } from "../../firebase";
import * as rootSlice from "../../features/root/rootSlice";

export const handleReset = async ({ dispatch, reset, setReset, data }) => {
  const verificationUser = functions.httpsCallable("sh-verificationUser");

  await verificationUser({ type: "child", email: data.reset }).catch((e) => {
    throw new dispatch(
      rootSlice.handleAnnounce({
        type: "error",
        text: "登録しているメールアドレスではパスワードの再設定は行えません",
      })
    );
  });

  await auth
    .sendPasswordResetEmail(data.reset)
    .then(() => {
      setReset(!reset);
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
