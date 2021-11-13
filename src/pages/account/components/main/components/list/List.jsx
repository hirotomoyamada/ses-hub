import { Account } from "../account/Account";
import styles from "./List.module.scss";

export const List = ({ user, account, children, load }) => {
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
      <Children />
    </div>
  );
};
