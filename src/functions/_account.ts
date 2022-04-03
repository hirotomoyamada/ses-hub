import { auth } from "libs/firebase";
import {
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import * as userSlice from "features/user/userSlice";
import * as rootSlice from "features/root/rootSlice";

import { NavigateFunction } from "react-router-dom";
import { OwnDispatch } from "@reduxjs/toolkit";
import { UseFormReturn } from "react-hook-form";
import { Data } from "pages/account/Account";

type HandleAuth = {
  dispatch: OwnDispatch;
  methods: UseFormReturn<Data>;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data | { password: string };
  navigate?: NavigateFunction;
};

export const handleAuth = async ({
  dispatch,
  methods,
  navigate,
  setAuth,
  data,
}: HandleAuth): Promise<void> => {
  const currentUser = auth.currentUser;

  if (currentUser?.email) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      data.password
    );

    await reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        setAuth(false);

        dispatch(userSlice.updateToken(data.password));
      })
      .catch(() => {
        methods.reset();
        navigate && navigate("/account", { replace: true });

        dispatch(
          rootSlice.handleAnnounce({
            error: "パスワードが正しくありません",
          })
        );
      });
  }
};

type HandleReset = {
  dispatch: OwnDispatch;
  email: string;
  methods?: UseFormReturn<Data>;
  setReset?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const handleReset = async ({
  dispatch,
  methods,
  setReset,
  email,
}: HandleReset): Promise<void> => {
  await sendPasswordResetEmail(auth, email)
    .then(() => {
      setReset && setReset(false);

      methods?.reset();

      dispatch(
        rootSlice.handleAnnounce({
          success: "登録しているメールアドレスに再送信しました",
        })
      );
    })
    .catch(() => {
      dispatch(
        rootSlice.handleAnnounce({
          error: "メールアドレスが存在しません",
        })
      );
    });
};
