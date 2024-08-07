import React, { useState } from 'react';
import styles from './Entry.module.scss';
import { useDispatch } from 'react-redux';
import { List } from './components/List';
import { User } from 'types/user';
import { Matter, Resource } from 'types/post';
import { addEntry } from 'features/user/actions';
import { OwnDispatch } from '@reduxjs/toolkit';
import { Oval } from 'react-loader-spinner';
import { Complete } from './components/Complete';

interface PropType {
  index: 'matters' | 'resources';
  user: User;
  post: Matter | Resource;
  handleClose: () => void;
}

export const Entry: React.FC<PropType> = ({ index, user, post, handleClose }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [proposedPost, setProposedPost] = useState<Matter | Resource | undefined>(undefined);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleEntry = async () => {
    if (!proposedPost) return;

    setLoad(true);

    await (dispatch as OwnDispatch)(addEntry({ index, post, proposedPost })).then(({ type }) => {
      if (!type.endsWith('/fulfilled')) return;

      setIsComplete(true);
    });

    setLoad(false);
  };

  return (
    <div className={styles.entry}>
      <div className={styles.entry_head}>
        <button onClick={handleClose} className={styles.entry_head_cancel}>
          もどる
        </button>

        <p className={styles.entry_head_ttl}>
          {isComplete ? '問い合わせが完了しました' : '問い合わせ'}
        </p>
      </div>

      {isComplete ? (
        <Complete index={index} post={post} proposedPost={proposedPost} />
      ) : (
        <List
          index={index}
          user={user}
          proposedPost={proposedPost}
          setProposedPost={setProposedPost}
        />
      )}

      <div className={styles.entry_email}>
        {isComplete ? (
          <button onClick={handleClose} className={`${styles.entry_email_btn}`}>
            とじる
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
};
