import styles from "../Form.module.scss";
import { useFormContext } from "react-hook-form";

export const Name = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={styles.form_col}>
      <span className={styles.form_tag}>会社名</span>
      <div>
        <input
          className={`${styles.form_input} ${
            errors.name && styles.form_input_error
          }`}
          placeholder="株式会社Hitmeup"
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
        <span className={styles.form_error}>{errors.name?.message}</span>
      </div>
    </div>
  );
};
