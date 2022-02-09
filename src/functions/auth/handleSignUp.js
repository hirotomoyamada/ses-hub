import { auth } from "../../firebase";
import * as rootSlice from "../../features/root/rootSlice";

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
    .then((e) => {
      setCreate(true);
      setEmail(true);
      methods.reset();
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
