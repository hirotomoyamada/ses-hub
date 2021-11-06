import { auth } from "../../../../firebase";
import * as rootSlice from "../../../root/rootSlice";

export const handleSignUp = async ({
  dispatch,
  methods,
  setCreate,
  setEmail,
  data,
}) => {
  const { email, password } = data;

  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async (e) => {
      await auth.currentUser
        .sendEmailVerification({
          url: `${process.env.REACT_APP_SES_HUB}/login`,
        })
        .then(() => {
          setCreate(true);
          setEmail(true);
          methods.reset();
        })
        .catch((e) => {
          console.log(e);
          dispatch(
            rootSlice.handleAnnounce({
              type: "error",
              text: "再度時間をおいてください",
            })
          );
        });
    })
    .catch((e) => {
      dispatch(
        rootSlice.handleAnnounce({
          type: "error",
          text: "アカウントの作成に失敗しました",
        })
      );
      methods.reset({
        email: data.email,
        password: "",
        verifiedPassword: "",
      });
    });
};
