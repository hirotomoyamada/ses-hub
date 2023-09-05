import React, { Dispatch, SetStateAction } from 'react';
import styles from './Header.module.scss';

import { ThreeDots } from 'react-loader-spinner';
import { useFormContext } from 'react-hook-form';

interface PropType {
  handleClose: () => void;
  edit?: boolean;
  fetch?: boolean;
  isAI: boolean;
  isDemo: boolean;
  setIsAI: Dispatch<SetStateAction<boolean>>;
}

export const AIHeader: React.FC<PropType> = ({ fetch, handleClose, isAI, isDemo, setIsAI }) => {
  const { clearErrors } = useFormContext();

  return (
    <div className={styles.header}>
      <button
        type='button'
        className={`${styles.header_cancel} ${fetch && styles.header_cancel_disabled}`}
        onClick={handleClose}>
        キャンセル
      </button>

      <div className={styles.header_wrap}>
        <div
          className={`${styles.header_display} ${styles.header_display_ai} ${
            (fetch || isDemo) && styles.header_display_disabled
          }`}>
          <input
            type='radio'
            id='basic'
            checked={!isAI}
            disabled={fetch || isDemo}
            onChange={() => {
              setIsAI(false);
              clearErrors();
            }}
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
            disabled={fetch || isDemo}
            onChange={() => setIsAI(true)}
          />

          <label
            className={`${styles.header_display_btn} ${styles.header_display_btn_ai}`}
            htmlFor='ai'>
            AI
          </label>
        </div>

        <button className={styles.header_submit} disabled={fetch} type='submit'>
          {fetch ? <ThreeDots color='#FFF' height={24} width={24} /> : '読込'}
        </button>
      </div>
    </div>
  );
};
