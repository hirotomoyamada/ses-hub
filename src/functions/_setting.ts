import React from "react";
import {
  auth,
  providerGithub,
  providerGoogle,
  providerTwitter,
} from "libs/firebase";
import {
  getRedirectResult,
  sendEmailVerification,
  sendPasswordResetEmail,
  linkWithCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  updateEmail,
  updatePassword,
  linkWithRedirect,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { UseFormReturn } from "react-hook-form";
import { OwnDispatch } from "@reduxjs/toolkit";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { User } from "types/user";
import { Data } from "pages/setting/Setting";

type GetRedirect = {
  dispatch: OwnDispatch;
};

export const getRedirect = ({ dispatch }: GetRedirect): void => {
  void getRedirectResult(auth)
    .then((result) => {
      if (result) {
        if (result.user.isAnonymous && result.user.emailVerified) {
          dispatch(
            rootSlice.handleAnnounce({
              success: "認証されました",
            })
          );
        }
      }
    })
    .catch((e: FirebaseError) => {
      if (e.code) {
        dispatch(
          rootSlice.handleAnnounce({
            error:
              e.code === "auth/email-already-in-use" ||
              e.code === "auth/credential-already-in-use"
                ? "同じメールアドレスのアカウントがすでに存在しています"
                : undefined,
          })
        );
      }
    });
};

type HandleCreate = {
  dispatch: OwnDispatch;
  methods: UseFormReturn<Data>;
  handleCancel: () => void;
  data: Data;
};

export const handleCreate = async ({
  dispatch,
  methods,
  handleCancel,
  data,
}: HandleCreate): Promise<void> => {
  const currentUser = auth.currentUser;
  const credential = EmailAuthProvider.credential(data.email, data.password);

  if (currentUser) {
    await linkWithCredential(currentUser, credential)
      .then(async (usercred) => {
        const password = usercred.user.providerData.find(
          (provider) => provider.providerId === "password"
        );

        if (password && usercred.user.email) {
          dispatch(
            userSlice.addProvider({
              provider: "password",
              email: usercred.user.email,
            })
          );

          await sendEmailVerification(currentUser, {
            url: `${process.env.REACT_APP_SES_HUB}/login`,
          });

          dispatch(
            rootSlice.handleAnnounce({
              success: "メールアカウントを作成しました",
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          rootSlice.handleAnnounce({
            error: "作成に失敗しました 再度ログインし直してください",
          })
        );
      });
  }

  handleCancel();
  methods.reset();
};

type HandleDelete = {
  dispatch: OwnDispatch;
  methods: UseFormReturn<Data>;
  user: User;
  next: boolean;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
  demo: boolean;
};

export const handleDelete = async ({
  dispatch,
  methods,
  user,
  next,
  setNext,
  data,
  demo,
}: HandleDelete): Promise<void> => {
  const currentUser = auth.currentUser;

  if (currentUser && currentUser.email) {
    const password = user?.provider?.find(
      (provider) => provider === "password"
    );
    const credential =
      password &&
      EmailAuthProvider.credential(currentUser.email, data.password);

    if (credential) {
      if (!next) {
        await reauthenticateWithCredential(currentUser, credential)
          .then(() => {
            setNext(true);
          })
          .catch(() => {
            methods.reset();

            dispatch(
              rootSlice.handleAnnounce({
                error: "パスワードが正しくありません",
              })
            );
          });
      } else if (password && !demo) {
        if (user?.type === "child") {
          throw dispatch(
            rootSlice.handleAnnounce({
              error: "このアカウントは削除できません",
            })
          );
        }

        if (user?.payment?.children?.length) {
          throw dispatch(
            rootSlice.handleAnnounce({
              error: "このアカウントは削除できません",
            })
          );
        }

        await reauthenticateWithCredential(currentUser, credential)
          .then(async () => {
            await deleteUser(currentUser)
              .then(() => {
                dispatch(
                  rootSlice.handleAnnounce({
                    success: "アカウントを削除しました",
                  })
                );

                dispatch(rootSlice.handleModal());
              })
              .catch(() => {
                dispatch(
                  rootSlice.handleAnnounce({
                    error: "アカウントの削除に失敗しました",
                  })
                );

                dispatch(rootSlice.handleModal());
              });
          })
          .catch(() => {
            dispatch(
              rootSlice.handleAnnounce({
                error:
                  "アカウントの削除に失敗しました 再度ログインし直してください",
              })
            );

            dispatch(rootSlice.handleModal());
          });
      }
    } else if (!demo) {
      if (user?.type === "child") {
        throw dispatch(
          rootSlice.handleAnnounce({
            error: "このアカウントでは削除できません",
          })
        );
      }

      await deleteUser(currentUser)
        .then(() => {
          dispatch(
            rootSlice.handleAnnounce({
              success: "アカウントを削除しました",
            })
          );

          dispatch(rootSlice.handleModal());
        })
        .catch(() => {
          dispatch(
            rootSlice.handleAnnounce({
              error:
                "アカウントの削除に失敗しました 再度ログインし直してください",
            })
          );

          dispatch(rootSlice.handleModal());
        });
    }
  }
};

type HandleEmail = {
  dispatch: OwnDispatch;
  methods: UseFormReturn<Data>;
  user: User;
  setEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
  demo: boolean;
};

export const handleEmail = async ({
  dispatch,
  methods,
  user,
  setEmail,
  setNext,
  data,
  demo,
}: HandleEmail): Promise<void> => {
  const currentUser = auth.currentUser;

  if (currentUser && currentUser.email) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      data.password
    );

    if (!data.email) {
      await reauthenticateWithCredential(currentUser, credential)
        .then(() => {
          setNext(true);
        })
        .catch(() => {
          methods.reset();

          dispatch(
            rootSlice.handleAnnounce({
              error: "パスワードが正しくありません",
            })
          );
        });
    }

    if (data.email && !demo) {
      if (user?.type === "child") {
        throw dispatch(
          rootSlice.handleAnnounce({
            error: "このアカウントでは変更できません",
          })
        );
      }

      await reauthenticateWithCredential(currentUser, credential)
        .then(async () => {
          await updateEmail(currentUser, data.email)
            .then(async () => {
              setEmail(false);
              setNext(false);

              dispatch(userSlice.changeEmail(data.email));

              await sendEmailVerification(currentUser, {
                url: `${process.env.REACT_APP_SES_HUB}/login`,
              });

              methods.reset();

              dispatch(
                rootSlice.handleAnnounce({
                  success: "メールドレスを更新しました",
                })
              );
            })
            .catch(() => {
              dispatch(
                rootSlice.handleAnnounce({
                  error: "メールドレスの更新に失敗しました",
                })
              );
            });
        })
        .catch(() => {
          dispatch(
            rootSlice.handleAnnounce({
              error: "パスワードが正しくありません",
            })
          );
        });
    }
  }
};

type HandlePassword = {
  dispatch: OwnDispatch;
  methods: UseFormReturn<Data>;
  user: User;
  setPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
  demo: boolean;
};

export const handlePassword = async ({
  dispatch,
  methods,
  user,
  setPassword,
  setNext,
  data,
  demo,
}: HandlePassword): Promise<void> => {
  const currentUser = auth.currentUser;

  if (currentUser && currentUser.email) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      data.currentPassword
    );

    if (!data.newPassword) {
      await reauthenticateWithCredential(currentUser, credential)
        .then(() => {
          setNext(true);
        })
        .catch(() => {
          methods.reset();

          dispatch(
            rootSlice.handleAnnounce({
              error: "パスワードが正しくありません",
            })
          );
        });
    }

    if (data.newPassword && !demo) {
      if (user?.type === "child") {
        throw dispatch(
          rootSlice.handleAnnounce({
            error: "このアカウントでは変更できません",
          })
        );
      }

      await reauthenticateWithCredential(currentUser, credential)
        .then(async () => {
          await updatePassword(currentUser, data.newPassword)
            .then(() => {
              setPassword(false);
              setNext(false);

              methods.reset();

              dispatch(
                rootSlice.handleAnnounce({
                  success: "パスワードを更新しました",
                })
              );
            })
            .catch(() => {
              dispatch(
                rootSlice.handleAnnounce({
                  error: "パスワードの更新に失敗しました",
                })
              );
            });
        })
        .catch(() => {
          dispatch(
            rootSlice.handleAnnounce({
              error: "パスワードが正しくありません",
            })
          );
        });
    }
  }
};

type HandleProvider = {
  dispatch: OwnDispatch;
  user: User;
  data: "google" | "twitter" | "github";
};

export const handleProvider = async ({
  dispatch,
  user,
  data,
}: HandleProvider): Promise<void> => {
  if (user?.type === "child") {
    throw dispatch(
      rootSlice.handleAnnounce({
        error: "このアカウントでは認証できません",
      })
    );
  }

  const currentUser = auth.currentUser;
  const provider =
    data === "google"
      ? providerGoogle
      : data === "twitter"
      ? providerTwitter
      : data === "github"
      ? providerGithub
      : undefined;

  if (currentUser && provider) {
    await linkWithRedirect(currentUser, provider);
  }
};

type HandleReset = {
  dispatch: OwnDispatch;
  methods: UseFormReturn<Data>;
  setEmail: React.Dispatch<React.SetStateAction<boolean>>;
  setPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  data: Data;
};

export const handleReset = async ({
  dispatch,
  methods,
  setEmail,
  setPassword,
  setNext,
  setReset,
  data,
}: HandleReset): Promise<void> => {
  await sendPasswordResetEmail(auth, data.email)
    .then(() => {
      setEmail(false);
      setPassword(false);
      setNext(false);
      setReset(false);

      methods.reset();

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
