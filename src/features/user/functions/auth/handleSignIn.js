import { auth } from "../../../../firebase";
import * as rootSlice from "../../../root/rootSlice";

export const handleSignIn = async ({ dispatch, methods, data }) => {
  const { email, password } = data;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    methods.reset();
  } catch (e) {
    dispatch(
      rootSlice.handleAnnounce({
        type: "error",
        text: "メールアドレスかパスワードが間違っています",
      })
    );
    methods.reset({ email: data.email, password: "", verifiedPassword: "" });
  }
};
