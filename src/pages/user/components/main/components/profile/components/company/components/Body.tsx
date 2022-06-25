import React from "react";
import styles from "../Company.module.scss";

import { Company } from "types/post";

interface PropType {
  user: Company;
}

export const Body: React.FC<PropType> = ({ user }) => {
  return user?.profile?.body ? (
    <div className={styles.profile_body}>
      <p className={styles.profile_body_txt}>{user?.profile?.body}</p>
    </div>
  ) : (
    <div className={`${styles.profile_body} ${styles.profile_body_none}`}>
      <p className={styles.profile_body_txt}>
        さぁ、あなたのプロフィールを充実させていきましょう。SNSアカウントを登録して他のメンバーと情報連携していきましょう!
      </p>
    </div>
  );
};
