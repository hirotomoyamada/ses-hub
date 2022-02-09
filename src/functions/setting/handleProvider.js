import {
  auth,
  providerGithub,
  providerGoogle,
  providerTwitter,
} from "../../firebase";

import * as rootSlice from "../../features/root/rootSlice";

export const handleProvider = async ({ dispatch, user, provider }) => {
  if (user?.type === "child") {
    throw new dispatch(
      rootSlice.handleAnnounce({
        type: "error",
        text: "このアカウントでは認証できません",
      })
    );
  }

  await auth.currentUser.linkWithRedirect(
    provider === "google"
      ? providerGoogle
      : provider === "twitter"
      ? providerTwitter
      : provider === "github" && providerGithub
  );
};
