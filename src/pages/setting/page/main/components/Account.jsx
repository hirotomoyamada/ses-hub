import styles from "../Main.module.scss";

export const Account = ({ user, history }) => {
  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>アカウント</span>
        <span className={styles.main_value}>
          <strong>4</strong> アカウントまで作成できます
        </span>
        {user?.provider && user.provider.indexOf("password") < 0 && (
          <span className={styles.main_desc}>
            メールログインを有効にする必要があります
          </span>
        )}
      </div>
      
      <button
        className={`${styles.main_btn} ${
          user?.provider &&
          user.provider.indexOf("password") < 0 &&
          styles.main_btn_disabled
        }`}
        type="button"
        onClick={() => history.push("/account")}
      >
        管理
      </button>
    </div>
  );
};
