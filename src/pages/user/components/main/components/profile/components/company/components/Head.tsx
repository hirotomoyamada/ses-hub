import React from 'react';
import styles from '../Company.module.scss';

import { Company } from 'types/post';
import { User } from 'types/user';

interface PropType {
  user: Company;
  currentUser: User;
}

export const Head: React.FC<PropType> = ({ user, currentUser }) => {
  return (
    <div>
      <div className={styles.profile_wrap}>
        <h1
          className={`${styles.profile_person} ${
            currentUser.payment.status === 'canceled' &&
            user.uid !== currentUser.uid &&
            styles.profile_person_dummy
          }`}>
          {user?.profile?.person}
        </h1>

        {'followed' in user && user.followed && (
          <span className={styles.profile_followed}>フォローされています</span>
        )}
      </div>

      <div className={styles.profile_wrap}>
        <h2
          className={`${styles.profile_name} ${
            currentUser.payment.status === 'canceled' &&
            user.uid !== currentUser.uid &&
            styles.profile_name_dummy
          }`}>
          {user?.profile?.name}
        </h2>

        {(currentUser.payment.status !== 'canceled' || user.uid === currentUser.uid) &&
        user.profile.invoice ? (
          <span className={styles.profile_invoice}>
            適格請求書発行事業者：
            {user.profile.invoice.type === '登録済み'
              ? `T${user.profile.invoice.no}`
              : user.profile.invoice.type}
          </span>
        ) : null}
      </div>
    </div>
  );
};
