import React from "react";
import {
  auth,
  providerGithub,
  providerGoogle,
  providerTwitter,
  functions,
} from "libs/firebase";
import {
  getRedirectResult,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  sendPasswordResetEmail,
} from "firebase/auth";
import { httpsCallable, HttpsCallable } from "firebase/functions";
import { FirebaseError } from "firebase/app";
import { UseFormReturn } from "react-hook-form";
import { OwnDispatch } from "@reduxjs/toolkit";

import { createProfile } from "features/user/actions";

import * as rootSlice from "features/root/rootSlice";

import { Data } from "pages/auth/Auth";

type GetRedirect = {
  dispatch: OwnDispatch;
};

export const getRedirect = ({ dispatch }: GetRedirect): void => {
  void getRedirectResult(auth)
    .then(async (result) => {
      if (result) {
        if (result.user.isAnonymous && result.user.emailVerified) {
          dispatch(
            rootSlice.handleAnnounce({
              success: "認証されました",
            })
          );
        }

        if (!result.user.emailVerified) {
          const currentUser = auth.currentUser;

          if (currentUser) {
            await sendEmailVerification(currentUser, {
              url: `${process.env.REACT_APP_SES_HUB}/login`,
            }).catch(() => {
              dispatch(
                rootSlice.handleAnnounce({
                  error: "再度時間をおいてください",
                })
              );
            });
          }
        }
      }
    })
    .catch((e: FirebaseError): void => {
      if (e.code) {
        dispatch(
          rootSlice.handleAnnounce({
            error:
              e.code === "auth/account-exists-with-different-credential"
                ? "同じメールアドレスのアカウントがすでに存在しています"
                : undefined,
          })
        );
      }
    });
};

type HandleCreate = {
  dispatch: OwnDispatch;
  data: Data;
};

export const handleCreate = async ({
  dispatch,
  data,
}: HandleCreate): Promise<void> => {
  if (
    !data.type ||
    !data.name ||
    !data.person ||
    (data.type === "individual" && !data.position) ||
    !data.tel ||
    !data.agree
  ) {
    dispatch(
      rootSlice.handleAnnounce({
        error: "登録に失敗しました ページを更新してください",
      })
    );

    return;
  }

  if (auth?.currentUser?.providerData?.[0]?.providerId) {
    const profile = {
      type: data.type,
      name: data.name,
      person: data.person,
      position: data.type === "individual" ? data.position : "",
      postal: data.postal,
      address: data.address,
      tel: data.tel,
      agree: data.agree,
      provider: auth.currentUser.providerData[0].providerId,
      pend: true,
    };

    await dispatch(createProfile(profile));
  }
};

type HandleSignUp = {
  dispatch: OwnDispatch;
  methods: UseFormReturn<Data>;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
};

export const handleSignUp = async ({
  dispatch,
  methods,
  setCreate,
  setEmail,
  data,
}: HandleSignUp): Promise<void> => {
  const { email, password } = data;

  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setCreate(true);
      setEmail(true);
      methods.reset();
    })
    .catch(() => {
      dispatch(
        rootSlice.handleAnnounce({
          error: "アカウントの作成に失敗しました",
        })
      );

      methods.reset({
        email: email,
        password: undefined,
        verifiedPassword: undefined,
      });
    });
};

type HandleSignIn = {
  dispatch: OwnDispatch;
  methods: UseFormReturn<Data>;
  data: Data;
};

export const handleSignIn = async ({
  dispatch,
  methods,
  data,
}: HandleSignIn): Promise<void> => {
  const { email, password } = data;

  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      methods.reset();
    })
    .catch(() => {
      dispatch(
        rootSlice.handleAnnounce({
          error: "メールアドレスかパスワードが間違っています",
        })
      );

      methods.reset({
        email: email,
        password: undefined,
        verifiedPassword: undefined,
      });
    });
};

export const handleProvider = async (
  data: "google" | "twitter" | "github"
): Promise<void> => {
  const provider =
    data === "google"
      ? providerGoogle
      : data === "twitter"
      ? providerTwitter
      : data === "github" && providerGithub;

  if (provider) {
    await signInWithRedirect(auth, provider);
  }
};

type HandleResend = {
  dispatch: OwnDispatch;
};

export const handleResend = async ({
  dispatch,
}: HandleResend): Promise<void> => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    await sendEmailVerification(currentUser, {
      url: `${process.env.REACT_APP_SES_HUB}/login`,
    })
      .then(() => {
        dispatch(
          rootSlice.handleAnnounce({
            success: "登録しているメールアドレスに再送信しました",
          })
        );
      })
      .catch(() => {
        dispatch(
          rootSlice.handleAnnounce({
            error: "再度時間をおいてください",
          })
        );
      });
  }
};

type HandleReset = {
  dispatch: OwnDispatch;
  reset: boolean;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
};

export const handleReset = async ({
  dispatch,
  reset,
  setReset,
  data,
}: HandleReset): Promise<void> => {
  const verificationUser: HttpsCallable<
    { type: string; email: string },
    unknown
  > = httpsCallable(functions, "sh-verificationUser");

  await verificationUser({ type: "child", email: data.reset }).catch(() => {
    throw dispatch(
      rootSlice.handleAnnounce({
        error: "登録しているメールアドレスではパスワードの再設定は行えません",
      })
    );
  });

  await sendPasswordResetEmail(auth, data.reset)
    .then(() => {
      setReset(!reset);

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
