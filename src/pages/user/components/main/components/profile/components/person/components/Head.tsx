import React from "react";
import styles from "../Person.module.scss";

import { Person } from "types/post";

interface PropType {
  user: Person;
}

export const Head: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.profile_col}>
      <div className={styles.profile_wrap}>
        <h1 className={styles.profile_name}>{user?.profile?.nickName}</h1>
      </div>

      <div className={styles.profile_wrap}>
        <div className={styles.profile_category}>{user?.profile?.position}</div>

        <div
          className={`${styles.profile_category} ${
            styles.profile_category_acnt
          } ${
            (user?.profile?.state === "確定" ||
              user?.profile?.state === "商談中" ||
              user?.profile?.state === "情報収集中") &&
            styles.profile_category_disable
          } ${
            user?.profile?.state === "至急" && styles.profile_category_hurry
          }`}
        >
          {user?.profile?.state}
        </div>
      </div>
    </div>
  );
};
