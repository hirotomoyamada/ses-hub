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
  const [selectedPost, setSelectedPost] = useState<Matter | Resource | undefined>(undefined);

  const handleEntry = (): void => {
    if (index === 'matters') {
      const entries = user.entries.matters ? user.entries.matters : [];

      if (entries.indexOf(post.objectID) < 0) {
        dispatch(userSlice.addEntry({ index: index, post: post }));
      }
    }

    if (index === 'resources') {
      const entries = user.entries.resources ? user.entries.resources : [];

      if (entries.indexOf(post.objectID) < 0) {
        dispatch(userSlice.addEntry({ index: index, post: post }));
      }
    }
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
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />

      <div className={styles.entry_email}>
        <button
          onClick={handleEntry}
          disabled={!selectedPost}
          className={`${styles.entry_email_btn} ${
            !selectedPost && styles.entry_email_btn_disabled
          }`}>
          問い合わせをする
        </button>
      </div>
    </div>
  );
};
