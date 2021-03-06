import React from "react";
import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "../../../Auth";

export const Tel: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

  return (
    <div className={root.auth_col}>
      <span className={styles.create_tag}>電話番号</span>

      <div>
        <input
          className={`${root.auth_input} ${root.auth_input_min} ${
            errors.tel && root.auth_input_error
          }`}
          placeholder="01-2345-6789"
          {...register("tel", {
            required: {
              value: true,
              message: "電話番号を入力してください",
            },
            pattern: {
              value: /^0\d{2,4}-\d{2,4}-\d{3,4}$/,
              message: "正しい電話番号を入力してください",
            },
            maxLength: {
              value: 13,
              message: "13文字以内で入力してください",
            },
          })}
        />

        {errors?.tel?.message && (
          <span className={root.auth_error}>{errors.tel.message}</span>
        )}
      </div>
    </div>
  );
};
