import styles from "./Account.module.scss";

import { useDevice } from "./hook/useDevice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";

import * as rootSlice from "../../features/root/rootSlice";

import { Header } from "../../components/header/Header";
import { Main } from "./components/main/Main";
import { Restrict } from "./components/restrict/Restrict";
import { Auth } from "./components/auth/Auth";

import * as functions from "../../features/user/functions/functions";

export const Account = () => {
  const dispatch = useDispatch();

  const [device] = useDevice();

  const [auth, setAuth] = useState(true);
  const [reset, setReset] = useState(false);

  const methods = useForm();

  useEffect(() => {
    dispatch(rootSlice.handlePage("account"));
  }, [dispatch]);

  const handleAuth = (data) => {
    functions.account.handleAuth({
      dispatch,
      methods,
      setAuth,
      data,
    });
  };

  const handleReset = (data) => {
    const email = data.email;

    functions.account.handleReset({
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

  return (
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
  );
};
