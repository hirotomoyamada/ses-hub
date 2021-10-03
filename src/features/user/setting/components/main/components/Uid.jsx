import styles from "../Main.module.scss";

export const Uid = ({ user }) => {
  return (
    <div className={styles.main_col}>
      <span className={styles.main_tag}>ユーザーID</span>
      <span className={`${styles.main_value} ${styles.main_value_id}`}>
        {user?.uid && user.uid}
      </span>
    </div>
  );
};
