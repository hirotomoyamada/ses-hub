import React from 'react';
import styles from '../Company.module.scss';

import { Company } from 'types/post';
import { User } from 'types/user';

interface PropType {
  user: Company;
  currentUser: User;
}

export const Body: React.FC<PropType> = ({ user, currentUser }) => {
  return user?.profile?.body ? (
    <div
      className={`${styles.profile_body} ${
        currentUser.payment.status === 'canceled' &&
        user.uid !== currentUser.uid &&
        styles.profile_body_dummy
      }`}>
      <p className={styles.profile_body_txt}>{user?.profile?.body}</p>
    </div>
  ) : (
    <div
      className={`${styles.profile_body} ${styles.profile_body_none} ${
        currentUser.payment.status === 'canceled' &&
        user.uid !== currentUser.uid &&
        styles.profile_body_dummy
      }`}>
      <p className={styles.profile_body_txt}>
        さぁ、あなたのプロフィールを充実させていきましょう。SNSアカウントを登録して他のメンバーと情報連携していきましょう!
      </p>
    </div>
  );
};
