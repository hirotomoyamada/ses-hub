import styles from "../Main.module.scss";

export const Type = ({ user }) => {
  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>タイプ</span>
        <span className={styles.main_value}>
          {user?.type === "corporate" ? "個人" : "法人"}
        </span>

        <span className={styles.main_desc}>変更することはできません</span>
      </div>
      <button
        className={`${styles.main_btn} ${styles.main_btn_disabled}`}
        type="button"
        onClick={() => null}
      >
        変更
      </button>
    </div>
  );
};
