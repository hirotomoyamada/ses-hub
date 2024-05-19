import React from 'react';
import styles from './Entry.module.scss';

import { useDispatch, useSelector } from 'react-redux';

import * as rootSlice from 'features/root/rootSlice';

interface PropType {
  handleClose: () => void;
  close?: () => void;
}

export const Entry: React.FC<PropType> = ({ handleClose, close }) => {
  const index = useSelector(rootSlice.index);
  const dispatch = useDispatch();

  const handleEntry = (): void => {
    dispatch(rootSlice.handleModal({ type: 'entry' }));
  };

  return (
    <div className={styles.entry}>
      <button type='button' className={styles.entry_back} onClick={!close ? handleClose : close}>
        今はしない
      </button>

      <div className={`${styles.entry_header}`}>
        <span className={styles.entry_desc}>
          \ あなたの{index === 'matters' ? '人材' : '案件'}をカンタンに提案 /
        </span>
        <p className={styles.entry_ttl}>
          この{index === 'matters' ? '案件' : '人材'}に問い合わせしてみたら？
        </p>
      </div>

      <button type='button' className={styles.entry_btn} onClick={handleEntry}>
        問い合わせする
      </button>

      <img src={`${process.env.PUBLIC_URL}/img/app/entry.svg`} alt='' className={styles.entry_bg} />
    </div>
  );
};
