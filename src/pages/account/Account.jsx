import styles from "./Account.module.scss";

import Loader from "react-loader-spinner";

import { useDevice } from "./hook/useDevice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import * as rootSlice from "../../features/root/rootSlice";
import * as userSlice from "../../features/user/userSlice";

import { Header } from "../../components/header/Header";
import { Main } from "./components/main/Main";
import { Restrict } from "./components/restrict/Restrict";
import { Auth } from "./components/auth/Auth";

import * as functions from "../../functions/functions";

export const Account = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [device] = useDevice();

  const [auth, setAuth] = useState(true);
  const [reset, setReset] = useState(false);

  const methods = useForm();

  useEffect(() => {
    dispatch(rootSlice.handlePage("account"));

    props?.history?.location?.state?.password &&
      functions.account.handleAuth({
        dispatch,
        history,
        methods,
        setAuth,
        data: { password: props?.history?.location?.state?.password },
      });

    return () => {
      dispatch(userSlice.updateToken());
    };
  }, [dispatch, history, methods, props?.history?.location?.state?.password]);

  const handleAuth = async (data) => {
    await functions.account.handleAuth({
      dispatch,
      methods,
      setAuth,
      data,
    });
  };

  const handleReset = async (data) => {
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

  return !props?.history?.location?.state?.password || !auth ? (
    <FormProvider {...methods}>
      <form
        id="form"
        className={`${styles.account} ${
          !device && !reset && !auth && styles.account_main
        }`}
        onSubmit={methods.handleSubmit(
          reset ? handleReset : auth && handleAuth
        )}
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
