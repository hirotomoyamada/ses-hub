import React from "react";
import styles from "../Create.module.scss";
import root from "../../../Auth.module.scss";

import { useFormContext } from "react-hook-form";

import { Data } from "../../../Auth";

export const Name: React.FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Data>();

  const type = watch("type");

  return (
    <div className={root.auth_col}>
      <span className={styles.create_tag}>
        会社名
        {type === "individual" && (
          <span className={styles.create_tag_desc}>
            &nbsp;※&nbsp;所属が無い場合は、営業フリーランスと入力してください
          </span>
        )}
      </span>

      <div>
        <input
          className={`${root.auth_input} ${
            errors.name && root.auth_input_error
          }`}
          placeholder="Hit me up 株式会社"
          {...register("name", {
            required: {
              value: true,
              message: "会社名を入力してください",
            },
            pattern: {
              value: /^\S+/,
              message: "先頭にスペースは使えません",
            },
            maxLength: {
              value: 32,
              message: "32文字以内で入力してください",
            },
          })}
        />

        {errors?.name?.message && (
          <span className={root.auth_error}>{errors.name.message}</span>
        )}
      </div>
    </div>
  );
};
