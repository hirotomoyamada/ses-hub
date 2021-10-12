import {
  auth,
  providerGithub,
  providerGoogle,
  providerTwitter,
} from "../../../firebase";

export const handleProvider = async (provider) => {
  await auth.signInWithRedirect(
    provider === "google"
      ? providerGoogle
      : provider === "twitter"
      ? providerTwitter
      : provider === "github" && providerGithub
  );
};
