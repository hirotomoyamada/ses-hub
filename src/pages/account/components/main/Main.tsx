import React from "react";
import root from "../../Account.module.scss";
import styles from "./Main.module.scss";

import { useAccount } from "hooks/useAccount";

import { Header } from "./components/header/Header";
import { List } from "./components/list/List";

export const Main: React.FC = () => {
  const [user, status, account, children, load] = useAccount();

  return (
    <div className={`${root.account_inner} ${styles.main}`}>
      <Header />
      <List
        user={user}
        status={status}
        account={account}
        children={children}
        load={load}
      />

      {user?.payment?.children?.length ? (
        <span className={root.account_desc}>
          すべてのアカウントはログイン可能です
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
