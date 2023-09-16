import React from 'react';
import styles from './Maintenance.module.scss';

import { useSelector } from 'react-redux';
import { useResize } from 'hooks/useResize';

import * as userSlice from 'features/user/userSlice';
import * as rootSlice from 'features/root/rootSlice';

const uids = process.env.REACT_APP_ADMIN_UIDS?.split(',') ?? [];

export const Maintenance: React.FC = () => {
  const user = useSelector(userSlice.user);
  const maintenance = useSelector(rootSlice.data)?.maintenance?.status;
  const [resize, inner] = useResize(maintenance);

  return maintenance === 'enable' && !uids.includes(user.uid) ? (
    <div className={`${styles.maintenance} ${resize && styles.maintenance_resize}`}>
      <div className={styles.maintenance_inner} ref={inner}>
        <span className={styles.maintenance_ttl}>メンテナンス中...</span>
        <img
          src={`${process.env.PUBLIC_URL}/img/app/maintenance.svg`}
          alt=''
          className={styles.maintenance_img}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};
