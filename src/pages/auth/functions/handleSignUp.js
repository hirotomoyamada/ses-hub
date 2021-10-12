import { auth } from "../../../firebase";

import * as rootSlice from "../../../features/root/rootSlice";

export const handleSignUp = async ({
  dispatch,
  methods,
  setCreate,
  setEmail,
  data,
}) => {
  const { email, password } = data;
  try {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (e) => {
        await auth.currentUser
          .sendEmailVerification({
            url: "https://ses-hub.app/login",
          })
          .then(() => {
            setCreate(true);
            setEmail(true);
          })
          .catch((e) => {
            dispatch(
              rootSlice.handleAnnounce({
                type: "error",
                text: "再度時間をおいてください",
              })
            );
          });
      });
    methods.reset();
  } catch (e) {
    dispatch(
      rootSlice.handleAnnounce({
        type: "error",
        text: "アカウントの作成に失敗しました",
      })
    );
    methods.reset({ email: data.email, password: "", verifiedPassword: "" });
  }
};
