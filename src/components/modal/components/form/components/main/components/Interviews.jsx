import styles from "./Item.module.scss";
import root from "../Main.module.scss";

import { useFormContext } from "react-hook-form";

export const Interviews = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${root.main_grid} ${root.main_grid_mid}`}>
      <div className={root.main_col}>
        <span className={root.main_tag}>面談</span>
        <div className={`${root.main_grid} ${root.main_grid_interviews}`}>
          <div className={`${styles.item} ${styles.item_select}`}>
            <select
              className={`${styles.item_input} ${
                errors.interviews?.type && styles.item_input_error
              }`}
              {...register("interviews.type", {
                required: {
                  value: true,
                  message: "面談種類を選択してください",
                },
              })}
            >
              <option value={"オンライン"}>オンライン</option>
              <option value={"現地"}>現地</option>
              <option value={"その他"}>その他</option>
            </select>
            <span>{errors.interviews?.type?.message}</span>
          </div>
          <div className={`${styles.item} ${styles.item_select}`}>
            <select
              className={`${styles.item_input} ${
                errors.interviews?.count && styles.item_input_error
              }`}
              {...register("interviews.count", {
                required: {
                  value: true,
                  message: "面談回数を選択してください",
                },
              })}
            >
              <option value={"1回"}>1回</option>
              <option value={"2回"}>2回</option>
              <option value={"その他"}>その他</option>
            </select>
            <span>{errors.interviews?.count?.message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
