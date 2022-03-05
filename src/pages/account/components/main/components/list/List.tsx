import React from "react";
import styles from "./List.module.scss";

import { Account } from "../account/Account";
import { Company } from "types/post";
import { User } from "types/user";

interface PropType {
  user: User;
  status: boolean;
  account: number;
  children: Company[];
  load: boolean;
}

export const List: React.FC<PropType> = ({
  user,
  status,
  account,
  children,
  load,
}) => {
  const list = ((): JSX.Element[] => {
    const array = [];

    for (
      let i = 0;
      i <
      (status
        ? account
        : user?.payment?.children
        ? user.payment.children.length
        : 0);
      i++
    ) {
      array.push(
        <Account
          status={status}
          key={i}
          user={children[i]}
          load={
            load && user?.payment?.children
              ? i < user.payment.children.length
              : false
          }
        />
      );
    }

    return array;
  })();

  return (
    <div className={styles.list}>
      <Account user={user} current />

      {list}
    </div>
  );
};
