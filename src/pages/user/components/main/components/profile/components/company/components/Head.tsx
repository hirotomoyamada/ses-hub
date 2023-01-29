import React from 'react';
import styles from '../Company.module.scss';

import { Company } from 'types/post';

interface PropType {
  user: Company;
}

export const Head: React.FC<PropType> = ({ user }) => {
  return (
    <div>
      <div className={styles.profile_wrap}>
        <h1 className={styles.profile_person}>{user?.profile?.person}</h1>

        {'followed' in user && user.followed && (
          <span className={styles.profile_followed}>フォローされています</span>
        )}
      </div>

      <div className={styles.profile_wrap}>
        <h2 className={styles.profile_name}>{user?.profile?.name}</h2>

        {user.profile.invoice ? (
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
