import { auth } from "../../firebase";

import * as rootSlice from "../../features/root/rootSlice";

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
    })
    .catch((e) => {
      if (e.code) {
        dispatch(
          rootSlice.handleAnnounce({
            type: "error",
            text:
              (e.code === "auth/email-already-in-use" ||
                e.code === "auth/credential-already-in-use") &&
              "同じメールアドレスのアカウントがすでに存在しています",
          })
        );
      }
    });
};
