import React from "react";
import styles from "../Company.module.scss";

import { Company } from "types/post";
import { User } from "types/user";

interface PropType {
  user: Company | User;
}

export const Follow: React.FC<PropType> = ({ user }) => {
  const follows = user.follows;
  const followers = user.followers;

  console.log(user);

  return (
    <div className={styles.profile_follow}>
      <div className={styles.profile_wrap}>
        {follows instanceof Array ? (
          <span className={styles.profile_follow_count}>
            {"payment" in user && user.payment.status !== "canceled"
              ? follows.length
              : 0}
          </span>
        ) : (
          <span className={styles.profile_follow_count}>{follows}</span>
        )}
        <span className={styles.profile_follow_txt}>フォロー中</span>
      </div>

      <div className={styles.profile_wrap}>
        <span className={styles.profile_follow_count}>{followers}</span>
        <span className={styles.profile_follow_txt}>フォロワー</span>
      </div>
    </div>
  );
};
