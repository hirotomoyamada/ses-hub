import React from 'react';
import styles from '../Create.module.scss';
import root from '../../../Auth.module.scss';

import { useFormContext } from 'react-hook-form';

import { Data } from '../../../Auth';

export const Invoice: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Data>();

  return (
    <div className={root.auth_col}>
      <span className={styles.create_tag}>適格請求書発行事業者</span>

      <div className={styles.select}>
        <select
          className={`${root.auth_input} ${root.auth_input_min} ${
            errors.invoice?.type && root.auth_input_error
          }`}
          {...register('invoice.type', {
            required: {
              value: true,
              message: '適格請求書発行事業者を選択してください',
            },
          })}>
          <option hidden value="">
            -
          </option>
          <option value="登録済み">登録済み</option>
          <option value="未登録">未登録</option>
          <option value="不明">不明</option>
        </select>

        {errors?.invoice?.type?.message && (
          <span className={root.auth_error}>{errors.invoice.type.message}</span>
        )}
      </div>

      {watch('invoice.type') === '登録済み' ? (
        <div>
          <div className={root.auth_row}>
            <span>T</span>

            <input
              className={`${root.auth_input} ${
                errors.invoice?.no && root.auth_input_error
              }`}
              placeholder="1-0123-4567-8910"
              {...register('invoice.no', {
                required: {
                  value: true,
                  message: '適格請求書発行事業者の登録番号を入力してください',
                },
                pattern: {
                  value: /^\d{1}-\d{4}-\d{4}-\d{4}$/,
                  message:
                    '正しい適格請求書発行事業者の登録番号を入力してください',
                },
                maxLength: {
                  value: 16,
                  message: '16文字以内で入力してください',
                },
              })}
            />
          </div>

          {errors.invoice?.no?.message ? (
            <span className={root.auth_error}>{errors.invoice.no.message}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
