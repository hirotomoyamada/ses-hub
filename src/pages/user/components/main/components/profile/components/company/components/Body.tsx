import React from "react";
import styles from "../Company.module.scss";

import { Company } from "types/post";

interface PropType {
  user: Company;
}

export const Body: React.FC<PropType> = ({ user }) => {
  return user?.profile?.body ? (
    <p className={styles.profile_body}>{user?.profile?.body}</p>
  ) : (
    <p className={`${styles.profile_body} ${styles.profile_body_none}`}>
      さぁ、あなたのプロフィールを充実させていきましょう。SNSアカウントを登録して他のメンバーと情報連携していきましょう!
    </p>
  );
};
