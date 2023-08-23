import React from 'react';
import styles from './Advertise.module.scss';

import { Link } from 'react-router-dom';

import { User } from 'types/user';

interface PropType {
  user: User;
  handleClose: () => void;
}

export const Advertise: React.FC<PropType> = ({ user, handleClose }) => {
  return (
    <div className={styles.advertise}>
      <div className={styles.advertise_header}>
        <span className={styles.advertise_desc}>\ 有料プランなら /</span>
        <p className={styles.advertise_ttl}>いろんな数値が見れちゃう</p>
      </div>

      <Link to={'/plan'} className={styles.advertise_btn} onClick={handleClose}>
        {user?.payment?.trial ? 'フリートライアル' : 'プランを見る'}
      </Link>

      <img
        src={`${process.env.PUBLIC_URL}/img/app/barchart.svg`}
        alt=''
        className={styles.advertise_bg}
      />
    </div>
  );
};
