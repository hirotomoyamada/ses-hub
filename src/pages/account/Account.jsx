import styles from "./Account.module.scss";

import { Header } from "../../components/header/Header";

export const Account = () => {
  return (
    <div className={styles.account}>
      <Header back goSetting />
    </div>
  );
};
