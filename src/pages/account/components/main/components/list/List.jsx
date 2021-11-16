import styles from "./List.module.scss";

import Loader from "react-loader-spinner";

import { Account } from "../account/Account";

export const List = ({ status, user, account, children, load }) => {
  const Children = () => {
    const array = [];

    for (let i = 0; i < account; i++) {
      array.push(
        <Account
          key={i}
          user={children[i]}
          load={load ? i < user?.payment?.children?.length : false}
        />
      );
    }

    return array;
  };

  return (
    <div className={styles.list}>
      <Account user={user} current />
      {status ? (
        <Children />
      ) : (
        <div className={styles.list_load}>
          <Loader
            className={styles.list_load_icon}
            type="Oval"
            color="#49b757"
            height={32}
            width={32}
          />
        </div>
      )}
    </div>
  );
};
