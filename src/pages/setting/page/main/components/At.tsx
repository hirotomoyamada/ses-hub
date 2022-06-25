import React from "react";
import styles from "../Main.module.scss";

import * as functions from "functions";

import { User } from "types/user";

interface PropType {
  user: User;
}

export const At: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.main_col}>
      <span className={styles.main_tag}>利用開始日</span>
      <span className={styles.main_value}>
        {functions.root.timestamp(user?.createAt, "day")}
      </span>
    </div>
  );
};
