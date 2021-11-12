import { auth } from "../../../../firebase";

import * as userSlice from "../../userSlice";

export const handleDelete = async ({
  dispatch,
  user,
  token,
  email,
  password,
}) => {
  await auth
    .signInWithEmailAndPassword(email, password)
    .then(async () => {
      const selectUser = auth.currentUser;

      await selectUser
        .delete()
        .then(async () => {
          const uid = selectUser.uid;
          const email = user.profile.email;
          const password = window.atob(token);

          dispatch(userSlice.resetUser(uid));

          await auth.signInWithEmailAndPassword(email, password).catch((e) => {
            throw new Error("アカウントの取得に失敗しました");
          });
        })
        .catch((e) => {
          throw new Error("アカウントの削除に失敗しました");
        });
    })
    .catch((e) => {
      throw new Error("パスワードが間違っています");
    });
};
