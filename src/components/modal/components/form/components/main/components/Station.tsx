import React from "react";

import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

import { Data } from "functions/_form";

export const Station: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data["resource"]>();

  const station = /^(.*駅$).*$/;

  return (
    <div className={`${root.main_col} ${root.main_col_mid}`}>
      <span className={root.main_tag}>最寄駅</span>
      <div className={styles.item}>
        <input
          placeholder="渋谷駅"
          className={`${styles.item_input} ${
            errors.station && styles.item_input_error
          }`}
          {...register("station", {
            pattern: {
              value: /^\S+/,
              message: "先頭にスペースは使えません",
            },
            minLength: {
              value: 2,
              message: "2文字以上で入力してください",
            },
            maxLength: {
              value: 24,
              message: "24文字以内で入力してください",
            },
            validate: {
              station: (value) => Boolean(station.exec(value)),
            },
          })}
        />

        {errors?.station?.type === "station" && (
          <span className={styles.item_error}>駅を含めてください</span>
        )}

        {errors?.station?.message && (
          <span className={styles.item_error}>{errors.station?.message}</span>
        )}
      </div>
    </div>
  );
};
