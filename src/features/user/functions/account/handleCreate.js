import { auth } from "../../../../firebase";

import { createChild } from "../../actions/createChild";

export const handleCreate = async ({
  dispatch,
  user,
  token,
  email,
  password,
}) => {
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then(async () => {
      const uid = user.uid;
      const email = user.profile.email;
      const password = window.atob(token);

      await dispatch(createChild(uid));

      await auth.signInWithEmailAndPassword(email, password).catch((e) => {
        throw new Error("アカウントの取得に失敗しました");
      });
    })
    .catch((e) => {
      console.log(e);
      throw new Error("アカウントの作成に失敗しました");
    });
};
