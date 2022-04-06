import React from "react";
import styles from "./Main.module.scss";

import { useFormContext, FieldError } from "react-hook-form";
import { Data } from "components/modal/components/activity/components/user/components/csv/Csv";

interface PropType {
  all: boolean;
  handleAll: () => void;
}

export const Name: React.FC<PropType> = ({ all, handleAll }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

  return (
    <div
      className={`
          ${styles.main_container} 
          ${styles.main_container_name} 
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_container_error
          }
        `}
    >
      <button
        type="button"
        className={`${styles.main_btn} ${all && styles.main_btn_cancel}`}
        onClick={handleAll}
      >
        {!all ? "すべて選択する" : "すべて解除する"}
      </button>

      <input
        type="checkbox"
        id="posts"
        {...register("name", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="posts"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label}
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="posts"
      >
        投稿
      </label>

      <input
        type="checkbox"
        id="histories"
        {...register("name", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="histories"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label}
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="histories"
      >
        閲覧
      </label>

      <input
        type="checkbox"
        id="likes"
        {...register("name", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="likes"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label}
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="likes"
      >
        いいね
      </label>

      <input
        type="checkbox"
        id="outputs"
        {...register("name", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="outputs"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label}
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="outputs"
      >
        出力
      </label>

      <input
        type="checkbox"
        id="entries"
        {...register("name", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="entries"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label}
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="entries"
      >
        お問い合わせ
      </label>

      <input
        type="checkbox"
        id="follows"
        {...register("name", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="follows"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label}
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="follows"
      >
        フォロー
      </label>

      <input
        type="checkbox"
        id="distributions"
        {...register("name", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="distributions"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label}
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="distributions"
      >
        商流
      </label>

      <input
        type="checkbox"
        id="approval"
        {...register("name", {
          required: {
            value: true,
            message: "選択してください",
          },
        })}
        value="approval"
        className={`${styles.main_input}`}
      />
      <label
        className={`
          ${styles.main_input_label}
          ${
            (errors.name as FieldError | undefined) &&
            styles.main_input_label_error
          }
        `}
        htmlFor="approval"
      >
        稟議速度
      </label>

      <span className={styles.main_desc}>※&nbsp;複数選択できます</span>

      {(errors.name as FieldError | undefined)?.message && (
        <span className={styles.main_error}>
          {(errors.name as FieldError | undefined)?.message}
        </span>
      )}
    </div>
  );
};
