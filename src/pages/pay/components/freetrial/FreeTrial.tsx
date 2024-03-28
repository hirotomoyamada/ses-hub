import React from 'react';
import { User } from 'types/user';
import styles from './FreeTrial.module.scss';

interface PropType {
  user: User;
}

export const FreeTrial: React.FC<PropType> = ({ user }) => {
  return user?.payment?.trial && user?.type === 'individual' ? (
    <div className={styles.free}>
      <p className={styles.free_desc}>\ Sales DXをもっと身近に！ /</p>
      <h1 className={styles.free_ttl}>サクサク商談しちゃおう</h1>
      <img
        src={`${process.env.PUBLIC_URL}/img/promotion/lets.svg`}
        alt=''
        className={styles.free_bg}
      />
    </div>
  ) : (
    <></>
  );
};
