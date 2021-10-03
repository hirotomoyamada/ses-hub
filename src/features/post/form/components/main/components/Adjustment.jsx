import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Adjustment = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>精算</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <select
          className={`${styles.item_input}   ${
            errors.adjustment && styles.item_input_error
          }`}
          {...register("adjustment", {
            required: {
              value: true,
              message: "精算を選択してください",
            },
          })}
        >
          <option value={"140h 〜 180h"}>140h&nbsp;〜&nbsp;180h</option>
          <option value={"160h 〜 200h"}>160h&nbsp;〜&nbsp;200h</option>
          <option value={"140h 〜 200h"}>140h&nbsp;〜&nbsp;200h</option>
          <option value={"その他"}>その他</option>
        </select>
        <span className={styles.item_error}>{errors.adjustment?.message}</span>
      </div>
    </div>
  );
};
