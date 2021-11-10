import root from "../../Account.module.scss";
import styles from "./Main.module.scss";

import Loader from "react-loader-spinner";

import { useAccount } from "../../hook/useAccount";
import { Header } from "./components/header/Header";
import { List } from "./components/list/List";

export const Main = () => {
  const [user, status, account, children] = useAccount();

  return status ? (
    <div className={`${root.account_inner} ${styles.main}`}>
      <Header />
      <List user={user} account={account} children={children} />
    </div>
  ) : (
    <div className={`${root.account_inner} ${root.account_inner_load}`}>
      <Loader type="Oval" color="#49b757" height={56} width={56} />
    </div>
  );
};
