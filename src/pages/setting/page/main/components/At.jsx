import styles from "../Main.module.scss";
import * as functions from "../../../../../functions/functions";

export const At = ({ user }) => {
  return (
    <div className={styles.main_col}>
      <span className={styles.main_tag}>利用開始日</span>
      <span className={styles.main_value}>
        {functions.root.timestamp(user?.createAt, "day")}
      </span>
    </div>
  );
};
