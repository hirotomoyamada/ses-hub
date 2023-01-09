import React from 'react';
import styles from './Item.module.scss';
import root from '../Main.module.scss';
import { useFormContext } from 'react-hook-form';

import { Data } from 'functions/_form';

export const Industry: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data['matter'] & Data['resource']>();

  return (
    <div className={`${root.main_col} ${root.main_col_mid}`}>
      <span className={root.main_tag}>業界</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <select
          className={`${styles.item_input} ${
            errors.industry && styles.item_input_error
          }`}
          {...register('industry', {
            required: {
              value: true,
              message: '業界を選択してください',
            },
          })}>
          <option hidden value="">
            -
          </option>
          <option value="SI・業務系">SI・業務系</option>
          <option value="通信">通信</option>
          <option value="銀行・証券・保険">銀行・証券・保険</option>
          <option value="ゲーム">ゲーム</option>
          <option value="WEBサービス">WEBサービス</option>
          <option value="EC">EC</option>
          <option value="エンタメ">エンタメ</option>
          <option value="広告">広告</option>
          <option value="メーカー">メーカー</option>
          <option value="流通・小売">流通・小売</option>
          <option value="公共・官公庁">公共・官公庁</option>
          <option value="医療・福祉">医療・福祉</option>
          <option value="その他">その他</option>
        </select>

        {errors.industry?.message && (
          <span className={styles.item_error}>{errors.industry.message}</span>
        )}
      </div>
    </div>
  );
};
