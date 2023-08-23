import React, { Dispatch, SetStateAction } from 'react';
import styles from './Header.module.scss';

import { useFormContext } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import * as userSlice from 'features/user/userSlice';
import * as rootSlice from 'features/root/rootSlice';

interface PropType {
  handleClose: () => void;
  edit?: boolean;
  fetch?: boolean;
  isAI: boolean;
  setIsAI: Dispatch<SetStateAction<boolean>>;
  hasPosts: boolean;
}

export const Header: React.FC<PropType> = ({
  edit,
  fetch,
  handleClose,
  isAI,
  setIsAI,
  hasPosts,
}) => {
  const { register, clearErrors } = useFormContext();
  const user = useSelector(userSlice.user);
  const demo = useSelector(rootSlice.verified)?.demo;

  return (
    <div className={styles.header}>
      <button
        type='button'
        className={`${styles.header_cancel} ${fetch && styles.header_cancel_disabled}`}
        onClick={handleClose}>
        キャンセル
      </button>

      <div className={styles.header_wrap}>
        <div className={`${styles.header_display} ${fetch && styles.header_display_disabled}`}>
          <input type='radio' id='display1' value='public' {...register('display')} />

          <label className={styles.header_display_btn} htmlFor='display1'>
            公開
          </label>

          <input type='radio' id='display2' value='private' {...register('display')} />

          <label className={styles.header_display_btn} htmlFor='display2'>
            非公開
          </label>
        </div>

        {!hasPosts && !edit && !demo ? (
          <div
            className={`${styles.header_display} ${styles.header_display_ai}  ${
              (user.payment?.status === 'canceled' || fetch) && styles.header_display_disabled
            }`}>
            <input
              type='radio'
              id='basic'
              checked={!isAI}
              disabled={user.payment?.status === 'canceled' || fetch}
              onChange={() => setIsAI(false)}
            />

            <label
              className={`${styles.header_display_btn} ${styles.header_display_btn_basic}`}
              htmlFor='basic'>
              通常
            </label>

            <input
              type='radio'
              id='ai'
              checked={isAI}
              disabled={user.payment?.status === 'canceled' || fetch}
              onChange={() => {
                setIsAI(true);
                clearErrors();
              }}
            />

            <label
              className={`${styles.header_display_btn} ${styles.header_display_btn_ai}`}
              htmlFor='ai'>
              AI
            </label>
          </div>
        ) : null}

        <button className={styles.header_submit} disabled={fetch} type='submit'>
          {fetch ? <ThreeDots color='#FFF' height={24} width={24} /> : edit ? '編集' : '登録'}
        </button>
      </div>
    </div>
  );
};
