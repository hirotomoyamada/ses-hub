import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Sex = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>性別</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <select
          className={`${styles.item_input} ${
            errors.sex && styles.item_input_error
          }`}
          {...register("sex", {
            required: {
              value: true,
              message: "性別を選択してください",
            },
          })}
        >
          <option value={"男性"}>男性</option>
          <option value={"女性"}>女性</option>
          <option value={"その他"}>その他</option>
        </select>
        <span className={styles.item_error}>{errors.sex?.message}</span>
      </div>
    </div>
  );
};
