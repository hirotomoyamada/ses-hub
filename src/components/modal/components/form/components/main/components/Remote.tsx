import React from 'react';
import styles from './Item.module.scss';
import root from '../Main.module.scss';
import { useFormContext } from 'react-hook-form';

export const Remote: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>リモート</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <select className={styles.item_input} {...register('remote')}>
          <option value={'あり'}>あり</option>
          <option value={'なし'}>なし</option>
        </select>
      </div>
    </div>
  );
};
