import { auth } from "../../../../firebase";
import * as userSlice from "../../userSlice";

export const getRedirect = ({ dispatch, email, verified }) => {
  auth
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        dispatch(
          userSlice.handleAnnounce({
            type: "success",
            text: "認証されました",
          })
        );
      }
    })
    .catch((e) => {
      if (e.code) {
        dispatch(
          userSlice.handleAnnounce({
            type: "error",
            text:
              e.code === "auth/account-exists-with-different-credential" &&
              "同じメールアドレスのアカウントがすでに存在しています",
          })
        );
      }
    });
};
