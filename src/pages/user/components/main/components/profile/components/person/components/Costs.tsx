import React from "react";
import styles from "../Person.module.scss";

import { Person } from "types/post";

interface PropType {
  user: Person;
}
export const Costs: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.profile_col}>
      <span className={styles.profile_tag}>単価</span>

      {user?.profile?.costs?.display !== "public" ? (
        <span>{user?.profile?.costs?.type}</span>
      ) : user?.profile?.costs?.min ? (
        <span>
          {user?.profile?.costs?.min}万&nbsp;〜&nbsp;
          {user?.profile?.costs?.max}万
        </span>
      ) : (
        <span>〜&nbsp;{user?.profile?.costs?.max}万</span>
      )}
    </div>
  );
};
