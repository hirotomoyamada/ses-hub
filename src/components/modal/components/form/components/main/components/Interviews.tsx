import React from 'react';
import styles from './Item.module.scss';
import root from '../Main.module.scss';

import { useFormContext } from 'react-hook-form';

import { Data } from 'functions/_form';

export const Interviews: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data['matter']>();

  return (
    <div className={`${root.main_grid} ${root.main_grid_mid}`}>
      <div className={root.main_col}>
        <span className={root.main_tag}>面談</span>
        <div className={`${root.main_grid} ${root.main_grid_interviews}`}>
          <div className={`${styles.item} ${styles.item_select}`}>
            <select
              className={`${styles.item_input} ${
                errors.interviews?.type && styles.item_input_error
              }`}
              {...register('interviews.type', {
                required: {
                  value: true,
                  message: '面談種類を選択してください',
                },
              })}>
              <option value={'オンライン'}>オンライン</option>
              <option value={'現地'}>現地</option>
              <option value={'その他'}>その他</option>
            </select>

            {errors?.interviews?.type?.message && (
              <span className={styles.item_error}>
                {errors.interviews?.type?.message}
              </span>
            )}
          </div>

          <div className={`${styles.item} ${styles.item_select}`}>
            <select
              className={`${styles.item_input} ${
                errors.interviews?.count && styles.item_input_error
              }`}
              {...register('interviews.count', {
                required: {
                  value: true,
                  message: '面談回数を選択してください',
                },
              })}>
              <option value={'1回'}>1回</option>
              <option value={'2回'}>2回</option>
              <option value={'その他'}>その他</option>
            </select>

            {errors?.interviews?.count?.message && (
              <span className={styles.item_error}>
                {errors.interviews?.count?.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={root.main_col}>
        <span className={root.main_tag}>面談設定</span>

        <div className={`${styles.item} ${styles.item_select}`}>
          <select
            className={`${styles.item_input} ${
              errors.interviews?.setting && styles.item_input_error
            }`}
            {...register('interviews.setting', {
              required: {
                value: true,
                message: '面談設定を選択してください',
              },
            })}>
            <option hidden value="">
              -
            </option>
            <option value={'当日中'}>当日中</option>
            <option value={'1営業日以内'}>1営業日以内</option>
            <option value={'3営業日以内'}>3営業日以内</option>
            <option value={'不明'}>不明</option>
          </select>

          {errors?.interviews?.setting?.message && (
            <span className={styles.item_error}>
              {errors.interviews?.setting?.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
