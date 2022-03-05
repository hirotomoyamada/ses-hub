import React, { useEffect, useState } from "react";
import styles from "./Setting.module.scss";

import { auth } from "libs/firebase";
import { signOut } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { Header } from "components/header/Header";

import { Page } from "./page/Page";

import * as functions from "functions";

export type Data = {
  email: string;
  password: string;
  verifiedPassword: string;
  currentPassword: string;
  newPassword: string;
};

export const Setting: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(userSlice.user);
  const demo = useSelector(rootSlice.verified).demo;

  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [create, setCreate] = useState(false);
  const [remove, setRemove] = useState(false);
  const [next, setNext] = useState(false);
  const [reset, setReset] = useState(false);

  const methods = useForm<Data>();

  useEffect(() => {
    dispatch(rootSlice.handlePage("setting"));
  }, [dispatch]);

  useEffect(() => {
    functions.setting.getRedirect({ dispatch });
  }, [dispatch]);

  const handleCancel = (): void => {
    setEmail(false);
    setPassword(false);
    setCreate(false);
    setRemove(false);
    setReset(false);
    setNext(false);
  };

  const handleCreate: SubmitHandler<Data> = async (data): Promise<void> => {
    if (demo) {
      return;
    }

    await functions.setting.handleCreate({
      dispatch,
      methods,
      handleCancel,
      data,
    });
  };

  const handleProvider = async (
    data: "google" | "twitter" | "github"
  ): Promise<void> => {
    if (demo) {
      return;
    }

    await functions.setting.handleProvider({ dispatch, user, data });
  };

  const handleEmail: SubmitHandler<Data> = async (data): Promise<void> => {
    await functions.setting.handleEmail({
      dispatch,
      methods,
      user,
      setEmail,
      setNext,
      data,
      demo,
    });
  };

  const handlePassword: SubmitHandler<Data> = async (data): Promise<void> => {
    await functions.setting.handlePassword({
      dispatch,
      methods,
      user,
      setPassword,
      setNext,
      data,
      demo,
    });
  };

  const handleReset: SubmitHandler<Data> = async (data): Promise<void> => {
    if (demo) {
      return;
    }

    await functions.setting.handleReset({
      dispatch,
      methods,
      setEmail,
      setPassword,
      setNext,
      setReset,
      data,
    });
  };

  const handleLogout = (): void => {
    document.body.classList.add("fadeIn");
    document.body.classList.remove("fadeOut");

    setTimeout(() => {
      void signOut(auth);
    }, 400);

    setTimeout(() => {
      document.body.classList.add("fadeOut");
      document.body.classList.remove("fadeIn");
    }, 700);

    dispatch(
      rootSlice.handleAnnounce({
        success: "ログアウトしました",
      })
    );
  };

  const handleDelete: SubmitHandler<Data> = async (data): Promise<void> => {
    await functions.setting.handleDelete({
      dispatch,
      methods,
      user,
      next,
      setNext,
      data,
      demo,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        id="form"
        className={`${styles.setting} ${
          !email &&
          !password &&
          !create &&
          !remove &&
          !reset &&
          !next &&
          styles.setting_main
        }`}
        onSubmit={methods.handleSubmit(
          reset
            ? handleReset
            : email
            ? handleEmail
            : password
            ? handlePassword
            : create
            ? handleCreate
            : remove
            ? handleDelete
            : () => {
                return;
              }
        )}
      >
        <Header
          user={user}
          email={email}
          password={password}
          create={create}
          remove={remove}
          handleCancel={handleCancel}
          ttl="アカウント情報"
          back
          setting
        />

        <Page
          user={user}
          email={email}
          password={password}
          create={create}
          remove={remove}
          next={next}
          reset={reset}
          setEmail={setEmail}
          setPassword={setPassword}
          setCreate={setCreate}
          setRemove={setRemove}
          setNext={setNext}
          setReset={setReset}
          handleProvider={handleProvider}
          handleLogout={handleLogout}
          history={history}
        />
      </form>
    </FormProvider>
  );
};
