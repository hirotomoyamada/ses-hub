import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Title = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>案件名</span>
      <div className={styles.item}>
        <input
          className={`${styles.item_input} ${
            errors.title && styles.item_input_error
          }`}
          {...register("title", {
            required: {
              value: true,
              message: "案件名を入力してください",
            },
            pattern: {
              value: /^\S+/,
              message: "先頭にスペースは使えません",
            },
            minLength: {
              value: 8,
              message: "8文字以上で入力してください",
            },
            maxLength: {
              value: 40,
              message: "40文字以内で入力してください",
            },
          })}
        />
        <span className={styles.item_error}>{errors.title?.message}</span>
      </div>
    </div>
  );
};
