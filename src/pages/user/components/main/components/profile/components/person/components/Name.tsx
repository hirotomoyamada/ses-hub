import React from "react";
import styles from "../Person.module.scss";

import { Person } from "types/post";

interface PropType {
  user: Person;
}

export const Name: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.profile_col}>
      <span className={styles.profile_tag}>氏名</span>
      <span className={`${user?.request !== "enable" && styles.profile_dummy}`}>
        {user?.profile?.name}
      </span>
    </div>
  );
};
