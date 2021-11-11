import styles from "./Account.module.scss";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";

import { Header } from "./components/header/Header";
import { Form } from "./components/form/Form";
import { Verification } from "./components/verification/Verification";

import * as functions from "../../../../features/user/functions/functions";

export const Account = ({ user, create, email, handleClose }) => {
  const dispatch = useDispatch();

  const [verification, setVerification] = useState(false);

  const methods = useForm();

  const handleCreate = (data) => {
    console.log(data);
  };

  const handleDelete = (data) => {
    const password = data.password;

    if (!verification) {
      functions.account.handleVerification({
        dispatch,
        methods,
        setVerification,
        email,
        password,
      });
    } else {
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.account}
        onSubmit={methods.handleSubmit(create ? handleCreate : handleDelete)}
      >
        <Header handleClose={handleClose} />

        {!verification ? <Form create={create} /> : <Verification />}
      </form>
    </FormProvider>
  );
};
