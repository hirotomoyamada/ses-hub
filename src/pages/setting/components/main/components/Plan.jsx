import styles from "../Main.module.scss";
import { timestamp } from "../../../../../functions/timestamp";

export const Plan = ({ user, history }) => {
  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>プラン</span>
        <span className={styles.main_value}>
          {user?.payment?.status === "active"
            ? "レギュラー"
            : user?.payment?.status === "trialing"
            ? "レギュラー(フリートライアル)"
            : "リミテッド"}
          &nbsp;&nbsp;
          {user?.payment?.end && (
            <span className={styles.main_value_time}>
              期限：
              {timestamp(user?.payment?.end, "day")}
            </span>
          )}
        </span>
      </div>
      <button
        className={styles.main_btn}
        type="button"
        onClick={() => history.push("/plan")}
      >
        変更
      </button>
    </div>
  );
};
