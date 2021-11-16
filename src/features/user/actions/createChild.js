import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, functions } from "../../../firebase";

export const createChild = createAsyncThunk(
  "user/createChild",
  async (data) => {
    const createChild = functions.httpsCallable("sh-createChild");

    const user = data.user;
    const selectUser = data.selectUser;

    const child = await auth
      .createUserWithEmailAndPassword(selectUser.email, selectUser.password)
      .then(async () => {
        return await createChild(user.uid)
          .then(async ({ data }) => {
            await auth
              .signInWithEmailAndPassword(user.email, user.password)
              .catch((e) => {});

            return data;
          })
          .catch(async (e) => {
            const child = auth.currentUser;

            await child.delete().catch(async (e) => {});

            await auth
              .signInWithEmailAndPassword(user.email, user.password)
              .catch((e) => {});

            return { error: e.message };
          });
      })
      .catch(async (e) => {
        await auth
          .signInWithEmailAndPassword(user.email, user.password)
          .catch((e) => {});

        return { error: "アカウントの作成に失敗しました" };
      });

    return child;
  }
);
