import { auth } from "../../../firebase";
import * as rootSlice from "../../../features/root/rootSlice";

export const getRedirect = ({ dispatch }) => {
  auth
    .getRedirectResult()
    .then((result) => {
      if (result.credential && result.user.emailVerified) {
        dispatch(
          rootSlice.handleAnnounce({
            type: "success",
            text: "認証されました",
          })
        );
      }

      if (!result.user.emailVerified) {
        auth.currentUser
          .sendEmailVerification({
            url: "https://ses-hub.app/login",
          })
          .catch((e) => {
            dispatch(
              rootSlice.handleAnnounce({
                type: "error",
                text: "再度時間をおいてください",
              })
            );
          });
      }
    })
    .catch((e) => {
      if (e.code) {
        dispatch(
          rootSlice.handleAnnounce({
            type: "error",
            text:
              e.code === "auth/account-exists-with-different-credential" &&
              "同じメールアドレスのアカウントがすでに存在しています",
          })
        );
      }
    });
};
