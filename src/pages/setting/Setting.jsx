import styles from "./Setting.module.scss";

import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import * as rootSlice from "../../features/root/rootSlice";
import * as userSlice from "../../features/user/userSlice";

import { Header } from "../../components/header/Header";

import { Password } from "./page/Password";
import { Email } from "./page/Email";
import { Create } from "./page/Create";
import { Reset } from "./page/Reset";
import { Delete } from "./page/Delete";
import { Main } from "./page/main/Main";

import * as functions from "../../functions/functions";

export const Setting = () => {
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

  const methods = useForm();

  useEffect(() => {
    dispatch(rootSlice.handlePage("setting"));
  }, [dispatch]);

  useEffect(() => {
    functions.setting.getRedirect({ dispatch });
  }, [dispatch]);

  const handleCancel = () => {
    setEmail(false);
    setPassword(false);
    setCreate(false);
    setRemove(false);
    setReset(false);
    setNext(false);
  };

  const handleCreate = (data) => {
    if (demo) {
      return;
    }

    functions.setting.handleCreate({ dispatch, methods, handleCancel, data });
  };

  const handleProvider = (provider) => {
    if (demo) {
      return;
    }

    functions.setting.handleProvider({ dispatch, user, provider });
  };

  const handleEmail = (data) => {
    functions.setting.handleEmail({
      dispatch,
      methods,
      user,
      setEmail,
      setNext,
      data,
      demo,
    });
  };

  const handlePassword = (data) => {
    functions.setting.handlePassword({
      dispatch,
      methods,
      user,
      setPassword,
      setNext,
      data,
      demo,
    });
  };

  const handleReset = (data) => {
    if (demo) {
      return;
    }

    functions.setting.handleReset({
      dispatch,
      methods,
      setEmail,
      setPassword,
      setNext,
      setReset,
      data,
    });
  };

  const handleLogout = () => {
    document.body.classList.add("fadeIn");
    document.body.classList.remove("fadeOut");

    setTimeout(() => {
      auth.signOut();
    }, 400);

    setTimeout(() => {
      document.body.classList.add("fadeOut");
      document.body.classList.remove("fadeIn");
    }, 700);

    dispatch(
      rootSlice.handleAnnounce({
        type: "success",
        text: "ログアウトしました",
      })
    );
  };

  const handleDelete = (data) => {
    functions.setting.handleDelete({
      dispatch,
      history,
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
            : remove && handleDelete
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

        {reset ? (
          <Reset />
        ) : create ? (
          <Create />
        ) : remove ? (
          <Delete
            next={next}
            user={user}
            setReset={setReset}
            setNext={setNext}
          />
        ) : email ? (
          <Email next={next} user={user} setReset={setReset} />
        ) : password ? (
          <Password next={next} setReset={setReset} />
        ) : (
          <Main
            user={user}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            setCreate={setCreate}
            setRemove={setRemove}
            handleProvider={handleProvider}
            handleLogout={handleLogout}
            history={history}
          />
        )}
      </form>
    </FormProvider>
  );
};
