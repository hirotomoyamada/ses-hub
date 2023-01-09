import React from 'react';
import styles from './Item.module.scss';
import root from '../Main.module.scss';

import { useFormContext } from 'react-hook-form';

import { Data } from 'functions/_form';

export const AreaLocation: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data['matter']>();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>場所</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <select
          className={`${styles.item_input} ${
            errors.location?.area && styles.item_input_error
          }`}
          {...register('location.area', {
            required: {
              value: true,
              message: '場所を選択してください',
            },
          })}>
          <option value="渋谷区">渋谷区</option>
          <option value="新宿区">新宿区</option>
          <option value="千代田区">千代田区</option>
          <option value="中央区">中央区</option>
          <option value="品川区">品川区</option>
          <option value="目黒区">目黒区</option>
          <option value="港区">港区</option>
          <option value="足立区">足立区</option>
          <option value="文京区">文京区</option>
          <option value="台東区">台東区</option>
          <option value="墨田区">墨田区</option>
          <option value="江東区">江東区</option>
          <option value="大田区">大田区</option>
          <option value="世田谷区">世田谷区</option>
          <option value="中野区">中野区</option>
          <option value="杉並区">杉並区</option>
          <option value="豊島区">豊島区</option>
          <option value="北区">北区</option>
          <option value="荒川区">荒川区</option>
          <option value="板橋区">板橋区</option>
          <option value="練馬区">練馬区</option>
          <option value="葛飾区">葛飾区</option>
          <option value="江戸川区">江戸川区</option>
          <option value="23区内">23区内</option>
          <option value="23区外">23区外</option>
          <option value="神奈川県">神奈川県</option>
          <option value="千葉県">千葉県</option>
          <option value="埼玉県">埼玉県</option>
          <option value="大阪府">大阪府</option>
          <option value="京都府">京都府</option>
          <option value="奈良県">奈良県</option>
          <option value="兵庫県">兵庫県</option>
          <option value="滋賀県">滋賀県</option>
          <option value="愛知県">愛知県</option>
          <option value="広島県">広島県</option>
          <option value="福岡県">福岡県</option>
          <option value="宮城県">宮城県</option>
          <option value="その他">その他</option>
        </select>

        {errors?.location?.area?.message && (
          <span className={styles.item_error}>
            {errors.location.area.message}
          </span>
        )}
      </div>
    </div>
  );
};

export const PlaceLocation: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data['matter']>();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>地名</span>
      <div className={styles.item}>
        <input
          placeholder="道玄坂"
          className={`${styles.item_input} ${
            errors.location?.place && styles.item_input_error
          }`}
          {...register('location.place', {
            pattern: {
              value: /^\S+/,
              message: '先頭にスペースは使えません',
            },
            maxLength: {
              value: 16,
              message: '16文字以内で入力してください',
            },
          })}
        />

        {errors?.location?.place?.message && (
          <span className={styles.item_error}>
            {errors.location.place.message}
          </span>
        )}
      </div>
    </div>
  );
};
