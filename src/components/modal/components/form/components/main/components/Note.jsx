import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Note = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>備考</span>
      <div className={styles.item}>
        <textarea
          className={`${styles.item_textarea} ${
            errors.note && styles.item_textarea_error
          }`}
          {...register("note", {
            pattern: {
              value: /^\S+/,
              message: "先頭にスペースは使えません",
            },
            maxLength: {
              value: 600,
              message: "600文字以内で入力してください",
            },
          })}
        ></textarea>
        <span className={styles.item_error}>{errors.note?.message}</span>
      </div>
    </div>
  );
};
