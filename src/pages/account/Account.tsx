import React, { useEffect, useState } from "react";
import styles from "./Account.module.scss";

import Loader from "react-loader-spinner";

import { useDevice } from "hooks/useDevice";
import { useDispatch } from "react-redux";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import * as rootSlice from "features/root/rootSlice";
import * as userSlice from "features/user/userSlice";

import { Header } from "components/header/Header";

import { Main } from "./components/main/Main";
import { Restrict } from "./components/restrict/Restrict";
import { Auth } from "./components/auth/Auth";

import * as functions from "functions";

export type Data = {
  email: string;
  password: string;
};

export const Account: React.FC<
  RouteComponentProps<
    Record<string, never>,
    Record<string, never>,
    { password: string }
  >
> = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [device] = useDevice();

  const [auth, setAuth] = useState(true);
  const [reset, setReset] = useState(false);

  const methods = useForm<Data>();

  useEffect(() => {
    dispatch(rootSlice.handlePage("account"));

    props?.location?.state?.password &&
      functions.account.handleAuth({
        dispatch,
        history,
        methods,
        setAuth,
        data: { password: props?.location?.state?.password },
      });

    return () => {
      dispatch(userSlice.updateToken());
    };
  }, [dispatch, history, methods, props?.location?.state?.password]);

  const handleAuth: SubmitHandler<Data> = async (data) => {
    await functions.account.handleAuth({
      dispatch,
      methods,
      setAuth,
      data,
    });
  };

  const handleReset: SubmitHandler<Data> = async (data) => {
    const email = data.email;

    await functions.account.handleReset({
      dispatch,
      methods,
      setReset,
      email,
    });
  };

  const handleCancel = () => {
    setReset(false);
    methods.reset();
  };

  return !props?.location?.state?.password || !auth ? (
    <FormProvider {...methods}>
      <form
        id="form"
        className={`${styles.account} ${
          !device && !reset && !auth && styles.account_main
        }`}
        onSubmit={methods.handleSubmit(reset ? handleReset : handleAuth)}
      >
        <Header reset={reset} handleCancel={handleCancel} back goSetting />

        {device ? (
          auth ? (
            <Auth reset={reset} setReset={setReset} />
          ) : (
            <Main />
          )
        ) : (
          <Restrict />
        )}
      </form>
    </FormProvider>
  ) : (
    <div className={styles.account_load}>
      <Loader type="Oval" color="#49b757" height={56} width={56} />
    </div>
  );
};
