import React from "react";
import styles from "../Person.module.scss";

import { Person } from "types/post";

interface PropType {
  user: Person;
}

export const Period: React.FC<PropType> = ({ user }) => {
  return user?.profile?.period?.year && user?.profile?.period?.month ? (
    <div className={styles.profile_col}>
      <span className={styles.profile_tag}>稼働開始時期</span>
      <span>
        {user?.profile?.period?.year}年&nbsp;{user?.profile?.period?.month}
        月&nbsp;〜
      </span>
    </div>
  ) : (
    <></>
  );
};
