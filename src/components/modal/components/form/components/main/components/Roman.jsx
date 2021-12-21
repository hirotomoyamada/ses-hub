import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Roman = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${root.main_grid} ${root.main_grid_half}`}>
      <div className={root.main_col}>
        <span className={root.main_tag}>ファーストネーム</span>
        <div className={styles.item}>
          <input
            placeholder="TARO"
            className={`${styles.item_input} ${
              errors.roman?.firstName && styles.item_input_error
            }`}
            {...register("roman.firstName", {
              required: {
                value: true,
                message: "ファーストネームを入力してください",
              },
              pattern: {
                value: /^\S+/,
                message: "先頭にスペースは使えません",
              },
              minLength: {
                value: 1,
                message: "1文字以上で入力してください",
              },
              maxLength: {
                value: 16,
                message: "16文字以内で入力してください",
              },
              validate: {
                string: (value) => value.match(/[^A-Z]/),
              },
            })}
          />

          {errors.roman?.firstName?.type === "string" && (
            <span className={styles.item_error}>
              半角大文字英字で入力してください
            </span>
          )}

          {errors.roman?.firstName?.message && (
            <span className={styles.item_error}>
              {errors.roman?.firstName?.message}
            </span>
          )}
        </div>
      </div>

      <div className={root.main_col}>
        <span className={root.main_tag}>ファミリーネーム</span>
        <div className={styles.item}>
          <input
            placeholder="YAMADA"
            className={`${styles.item_input} ${
              errors.roman?.lastName && styles.item_input_error
            }`}
            {...register("roman.lastName", {
              required: {
                value: true,
                message: "ラストネームを入力してください",
              },
              pattern: {
                value: /^\S+/,
                message: "先頭にスペースは使えません",
              },
              minLength: {
                value: 1,
                message: "1文字以上で入力してください",
              },
              maxLength: {
                value: 16,
                message: "16文字以内で入力してください",
              },
              validate: {
                string: (value) => value.match(/[^A-Z]/),
              },
            })}
          />

          {errors.roman?.lastName?.type === "string" && (
            <span className={styles.item_error}>
              半角大文字英字で入力してください
            </span>
          )}

          {errors.roman?.lastName?.message && (
            <span className={styles.item_error}>
              {errors.roman?.lastName?.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
