import React from "react";
import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

import { Data } from "functions/_form";

export const Parallel: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data["resource"]>();

  return (
    <div className={root.main_grid}>
      <div className={root.main_col}>
        <span className={root.main_tag}>並行</span>
        <div className={`${styles.item} ${styles.item_select}`}>
          <select
            className={`${styles.item_input} ${
              errors.parallel && styles.item_input_error
            }`}
            {...register("parallel", {
              required: {
                value: true,
                message: "並行を選択してください",
              },
            })}
          >
            <option value={"あり"}>あり</option>
            <option value={"なし"}>なし</option>
            <option value={"提案中"}>提案中</option>
          </select>

          {errors.parallel?.message && (
            <span className={styles.item_error}>{errors.parallel.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};
