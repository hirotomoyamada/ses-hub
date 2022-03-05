import React from "react";
import styles from "./Account.module.scss";

import { useChildren } from "hooks/useChildren";
import { FormProvider } from "react-hook-form";

import { Header } from "./components/header/Header";
import { Form } from "./components/form/Form";
import { Load } from "./components/load/Load";

interface PropType {
  uid: { user: string; selectUser: string };
  email: { user: string; selectUser: string };
  type: string;
  handleClose: () => void;
}

export const Account: React.FC<PropType> = ({
  uid,
  email,
  type,
  handleClose,
}) => {
  const [load, methods, handleCreate, handleEmail, handleDelete] = useChildren(
    uid,
    email
  );

  return !load ? (
    <FormProvider {...methods}>
      <form
        className={styles.account}
        onSubmit={methods.handleSubmit(
          type === "create"
            ? handleCreate
            : type === "email"
            ? handleEmail
            : handleDelete
        )}
      >
        <Header handleClose={handleClose} />
        <Form type={type} />
      </form>
    </FormProvider>
  ) : (
    <div className={`${styles.account} ${styles.account_load}`}>
      <Load type={type} />
    </div>
  );
};
