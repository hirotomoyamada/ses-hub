import styles from "./Item.module.scss";
import root from "../Main.module.scss";
import { useFormContext } from "react-hook-form";

export const Approval = () => {
  const { register } = useFormContext();

  return (
    <div className={root.main_col}>
      <span className={root.main_tag}>稟議速度</span>
      <div className={`${styles.item} ${styles.item_select}`}>
        <select className={styles.item_input} {...register("approval")}>
          <option value={"当日中"}>当日中</option>
          <option value={"翌営業1日以内"}>翌営業1日以内</option>
          <option value={"翌営業3日以内"}>翌営業3日以内</option>
          <option value={"不明"}>不明</option>
        </select>
      </div>
    </div>
  );
};
