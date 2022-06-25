import React from "react";
import styles from "../../../Contact.module.scss";
import { useFormContext } from "react-hook-form";

import { Data } from "../../../../../hooks/useForm";

export const Position: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Data>();

  return (
    <div className={styles.contact_form_item}>
      <span className={styles.contact_form_tag}>役職</span>
      <input
        className={`${styles.contact_form_input} ${
          errors.position && styles.contact_form_input_error
        }`}
        {...register("position", {
          pattern: {
            value: /^\S+/,
            message: "先頭にスペースは使えません",
          },
          maxLength: {
            value: 144,
            message: "144文字以内で入力してください",
          },
        })}
      />
      {errors?.position?.message && (
        <span className={styles.contact_form_error}>
          {errors.position.message}
        </span>
      )}
    </div>
  );
};
