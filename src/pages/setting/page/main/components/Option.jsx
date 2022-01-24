import styles from "../Main.module.scss";

export const Option = ({ user }) => {
  return user?.payment?.status !== "canceled" && user?.payment?.option?.freelanceDirect ? (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>オプション</span>
        <span className={styles.main_value}>Freelance Direct</span>
      </div>
      <button
        className={`${styles.main_btn} ${styles.main_btn_disabled}`}
        type="button"
      >
        連携済み
      </button>
    </div>
  ) : (
    <></>
  );
};
