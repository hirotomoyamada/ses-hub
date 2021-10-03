import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Status = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={root.main_grid}>
      <div className={root.main_col}>
        <span className={root.main_tag}>ステータス</span>
        <div className={`${styles.item} ${styles.item_select}`}>
          <select
            className={`${styles.item_input} ${
              errors.status && styles.item_input_error
            }`}
            {...register("status", {
              required: {
                value: true,
                message: "ステータスを選択してください",
              },
            })}
          >
            <option value="新規">新規</option>
            <option value="提案中">提案中</option>
            <option value="面談中">面談中</option>
            <option value="保留中">保留中</option>
            <option value="フォロー中">フォロー中</option>
            <option value="成約">成約</option>
          </select>
          <span className={styles.item_error}>{errors.status?.message}</span>
        </div>
      </div>
    </div>
  );
};
