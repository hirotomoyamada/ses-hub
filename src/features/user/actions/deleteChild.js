import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase";

export const deleteChild = createAsyncThunk(
  "user/deleteChild",
  async (data) => {
    const user = data.user;
    const selectUser = data.selectUser;

    const child = await auth
      .signInWithEmailAndPassword(selectUser.email, selectUser.password)
      .then(async () => {
        const child = auth.currentUser;

        await child
          .delete()
          .then(async () => {
            await auth
              .signInWithEmailAndPassword(user.email, user.password)
              .catch((e) => {});
          })
          .catch(async (e) => {
            await auth
              .signInWithEmailAndPassword(user.email, user.password)
              .catch((e) => {});

            return { error: "アカウントの削除に失敗しました" };
          });

        return child.uid;
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
