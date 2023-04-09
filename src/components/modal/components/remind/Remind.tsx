import React from 'react';
import styles from './Remind.module.scss';

import { useDispatch } from 'react-redux';

import * as rootSlice from 'features/root/rootSlice';
import { useNavigate } from 'react-router-dom';

export const Remind: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemind = (): void => {
    dispatch(rootSlice.handleRemind());
  };

  return (
    <div className={styles.remind}>
      <span className={styles.remind_title}>
        もってる案件/人材情報を登録しちゃおう
      </span>

      <div className={styles.remind_body}>
        <span>入力カンタン！</span>

        <p>HUBのみんなとサクサク商談していきましょう</p>

        <img
          src={`${process.env.PUBLIC_URL}/img/app/remind.svg`}
          alt=""
          className={styles.remind_bg}
        />

        <p>使い方はこちらで「投稿」をチェック</p>

        <button
          type="button"
          className={styles.remind_btn}
          onClick={() => {
            navigate('/howto', { state: 'posts' });
            handleRemind();
          }}>
          How to App を見る
        </button>
      </div>

      <button
        type="button"
        className={`${styles.remind_btn} ${styles.remind_btn_close}`}
        onClick={handleRemind}>
        とじる
      </button>
    </div>
  );
};
