import styles from "./Account.module.scss";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";

import * as rootSlice from "../../../../features/root/rootSlice";
import * as userSlice from "../../../../features/user/userSlice";

import { Header } from "./components/header/Header";
import { Form } from "./components/form/Form";
import { Load } from "./components/load/Load";

import * as functions from "../../../../features/user/functions/functions";

export const Account = ({ user, create, selectUser, handleClose }) => {
  const dispatch = useDispatch();
  const token = useSelector(userSlice.token);

  const [load, setLoad] = useState(false);

  const methods = useForm();

  const handleCreate = async (data) => {
    setLoad(true);

    const email = data.email;
    const password = data.password;

    await functions.account
      .handleCreate({
        dispatch,
        user,
        token,
        email,
        password,
      })
      .then(() => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "success",
            text: "アカウントを作成しました",
          })
        );
      })
      .catch((e) => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "error",
            text: e.message,
          })
        );

        methods.reset();
        setLoad(false);
      });
  };

  const handleDelete = async (data) => {
    setLoad(true);

    const email = selectUser.profile.email;
    const password = data.password;

    await functions.account
      .handleDelete({
        dispatch,
        user,
        token,
        email,
        password,
      })
      .then(() => {
        dispatch(
          rootSlice.handleAnnounce({
            type: "success",
            text: "アカウントを削除しました",
          })
        );
      })
      .catch((e) => {

        dispatch(
          rootSlice.handleAnnounce({
            type: "error",
            text: e.message,
          })
        );

        methods.reset();
        setLoad(false);
      });
  };

  return !load ? (
    <FormProvider {...methods}>
      <form
        className={styles.account}
        onSubmit={methods.handleSubmit(create ? handleCreate : handleDelete)}
      >
        <Header handleClose={handleClose} />
        <Form create={create} />
      </form>
    </FormProvider>
  ) : (
    <div className={`${styles.account} ${styles.account_load}`}>
      <Load create={create} />
    </div>
  );
};
