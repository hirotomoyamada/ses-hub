import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Times = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>就業時間</span>
      <div className={`${root.main_grid} ${root.main_grid_times}`}>
        <div className={styles.item}>
          <input
            className={`${styles.item_input} ${styles.item_input_center} ${
              errors.times?.start && styles.item_input_error
            }`}
            defaultValue="10:00"
            type="time"
            {...register("times.start", {
              required: {
                value: true,
                message: "開始時間を入力してください",
              },
            })}
          />
        </div>
        <span className={styles.item_mark}>〜</span>
        <div className={styles.item}>
          <input
            className={`${styles.item_input} ${styles.item_input_center} ${
              errors.times?.end && styles.item_input_error
            }`}
            type="time"
            defaultValue="19:00"
            {...register("times.end", {
              required: {
                value: true,
                message: "終了時間を入力してください",
              },
            })}
          />
        </div>
      </div>
      <div>
        <span className={styles.item_error}>
          {errors.times?.start?.message}
        </span>
        <span className={styles.item_error}>{errors.times?.end?.message}</span>
      </div>
    </div>
  );
};
