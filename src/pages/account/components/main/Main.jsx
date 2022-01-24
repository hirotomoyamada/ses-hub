import root from "../../Account.module.scss";
import styles from "./Main.module.scss";

import { useAccount } from "../../hook/useAccount";

import { Header } from "./components/header/Header";
import { List } from "./components/list/List";

export const Main = () => {
  const [user, status, account, children, load] = useAccount();

  return (
    <div className={`${root.account_inner} ${styles.main}`}>
      <Header />
      <List
        status={status}
        user={user}
        account={account}
        children={children}
        load={load}
      />
      <span className={root.account_desc}>
        すべてのアカウントはログイン可能です
      </span>
    </div>
  );
};
