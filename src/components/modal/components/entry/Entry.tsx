import React, { useState } from 'react';
import styles from './Entry.module.scss';
import { useDispatch } from 'react-redux';
import * as userSlice from 'features/user/userSlice';
import { List } from './components/List';
import { User } from 'types/user';
import { Matter, Resource } from 'types/post';

interface PropType {
  index: 'matters' | 'resources';
  user: User;
  post: Matter | Resource;
  handleClose: () => void;
}

export const Entry: React.FC<PropType> = ({ index, user, post, handleClose }) => {
  const dispatch = useDispatch();
  const [proposedPost, setproposedPost] = useState<Matter | Resource | undefined>(undefined);

  const handleEntry = (): void => {
    if (!proposedPost) return;

    dispatch(userSlice.addEntry({ index, post, proposedPost }));
  };

  return (
    <div className={styles.entry}>
      <div className={styles.entry_head}>
        <button onClick={handleClose} className={styles.entry_head_cancel}>
          もどる
        </button>

        <p className={styles.entry_head_ttl}>問い合わせ</p>
      </div>

      <List
        index={index}
        user={user}
        proposedPost={proposedPost}
        setproposedPost={setproposedPost}
      />

      <div className={styles.entry_email}>
        <button
          onClick={handleEntry}
          disabled={!proposedPost}
          className={`${styles.entry_email_btn} ${
            !proposedPost && styles.entry_email_btn_disabled
          }`}>
          問い合わせをする
        </button>
      </div>
    </div>
  );
};
