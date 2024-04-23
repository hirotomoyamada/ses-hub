import React from 'react';
import styles from './Entry.module.scss';

import { useSelector } from 'react-redux';
import * as rootSlice from 'features/root/rootSlice';

import { Matter, Resource } from 'types/post';
import { User } from 'types/user';

interface PropType {
  post: Matter | Resource;
  user: User;
  entry: boolean;
  handleEntry: () => void;
}

export const Entry: React.FC<PropType> = ({ post, user, entry, handleEntry }) => {
  const demo = useSelector(rootSlice.verified).demo;
  const canceled = user.payment.status === 'canceled';

  return post?.user?.uid !== user?.uid ? (
    <div className={styles.entry}>
      <button
        className={`${styles.entry_btn} ${(demo || canceled) && styles.entry_btn_disabled} ${
          demo && styles.entry_btn_disabled_truly
        }`}
        onClick={handleEntry}>
        {demo
          ? '問い合わせすることができません'
          : entry
          ? '問い合わせ済みです'
          : '問い合わせをする'}
      </button>
    </div>
  ) : (
    <></>
  );
};
