import styles from "./Account.module.scss";

import { useAccount } from "./hook/useAccount";
import { FormProvider } from "react-hook-form";

import { Header } from "./components/header/Header";
import { Form } from "./components/form/Form";
import { Load } from "./components/load/Load";

export const Account = ({ uid, email, create, handleClose }) => {
  const [load, methods, handleCreate, handleDelete] = useAccount(uid, email);

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
