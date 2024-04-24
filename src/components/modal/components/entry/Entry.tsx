import React, { useState } from 'react';
import styles from './Entry.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { List } from './components/List';
import { User } from 'types/user';
import { Matter, Resource } from 'types/post';
import { addEntry } from 'features/user/actions';
import { OwnDispatch } from '@reduxjs/toolkit';
import * as rootSlice from 'features/root/rootSlice';
import { Oval } from 'react-loader-spinner';

interface PropType {
  index: 'matters' | 'resources';
  user: User;
  post: Matter | Resource;
  handleClose: () => void;
}

export const Entry: React.FC<PropType> = ({ index, user, post, handleClose }) => {
  const dispatch = useDispatch();
  const load = useSelector(rootSlice.load).fetch;
  const [proposedPost, setProposedPost] = useState<Matter | Resource | undefined>(undefined);

  const handleEntry = async (): Promise<void> => {
    if (!proposedPost) return;

    await (dispatch as OwnDispatch)(addEntry({ index, post, proposedPost })).then(({ type }) => {
      if (type.endsWith('/fulfilled')) handleClose();
    });
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
        setProposedPost={setProposedPost}
      />

      <div className={styles.entry_email}>
        <button
          onClick={handleEntry}
          disabled={!proposedPost}
          className={`${styles.entry_email_btn} ${
            !proposedPost && styles.entry_email_btn_disabled
          }`}>
          {load ? (
            <span>
              <Oval color='#ffffff' secondaryColor='#ffffff' height={16} width={16} />
            </span>
          ) : (
            '問い合わせをする'
          )}
        </button>
      </div>
    </div>
  );
};
