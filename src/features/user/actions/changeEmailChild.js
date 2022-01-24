import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, functions } from "../../../firebase";

export const changeEmailChild = createAsyncThunk(
  "user/changeEmailChild",
  async (data) => {
    const changeEmail = functions.httpsCallable("sh-changeEmail");

    const user = data.user;
    const selectUser = data.selectUser;

    const child = await auth
      .signInWithEmailAndPassword(selectUser.currentEmail, selectUser.password)
      .then(async () => {
        const child = auth.currentUser;

        return await child
          .updateEmail(selectUser.email)
          .then(async () => {
            await changeEmail({
              uid: child.uid,
              email: selectUser.email,
            }).then(async () => {
              await auth
                .signInWithEmailAndPassword(user.email, user.password)
                .catch((e) => {});
            });

            return { uid: child.uid, email: selectUser.email };
          })
          .catch(async (e) => {
            await auth
              .signInWithEmailAndPassword(user.email, user.password)
              .catch((e) => {});

            return { error: "メールアドレスの変更に失敗しました" };
          });
      })
      .catch(async (e) => {
        await auth
          .signInWithEmailAndPassword(user.email, user.password)
          .catch((e) => {});

        return { error: "パスワードが間違っています" };
      });

    return child;
  }
);
