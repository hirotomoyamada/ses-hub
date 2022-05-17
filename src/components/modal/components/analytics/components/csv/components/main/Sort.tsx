import React from "react";
import styles from "./Main.module.scss";

import { useFormContext, FieldError } from "react-hook-form";

import { Data } from "components/modal/components/analytics/components/csv/Csv";

export const Sort = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

  return (
    <div
      className={`
          ${styles.main_container} 
          ${styles.main_container_sort} 
          ${
            (errors.sort as FieldError | undefined) &&
            styles.main_container_error
          }
        `}
    >
      <input
        type="checkbox"
        id="self"
        {...register("sort", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="self"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label} 
          ${
            (errors.sort as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="self"
      >
        した数
      </label>

      <input
        type="checkbox"
        id="others"
        {...register("sort", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="others"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label} 
          ${
            (errors.sort as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="others"
      >
        された数
      </label>

      <span className={styles.main_desc}>※&nbsp;複数選択できます</span>

      {(errors.sort as FieldError | undefined)?.message && (
        <span className={styles.main_error}>
          {(errors.sort as FieldError | undefined)?.message}
        </span>
      )}
    </div>
  );
};
