import React from "react";
import styles from "../Company.module.scss";

import { Company } from "types/post";

interface PropType {
  user: Company;
}

export const Head: React.FC<PropType> = ({ user }) => {
  return (
    <div>
      <div className={styles.profile_wrap}>
        <h1 className={styles.profile_person}>{user?.profile?.person}</h1>

        {"followed" in user && user.followed && (
          <span className={styles.profile_followed}>フォローされています</span>
        )}
      </div>

      <h2 className={styles.profile_name}>{user?.profile?.name}</h2>
    </div>
  );
};
