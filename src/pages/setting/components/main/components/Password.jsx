import styles from "../Main.module.scss";

export const Password = ({ user, password, setPassword }) => {
  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>パスワード</span>
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
        onClick={() => setPassword(!password)}
      >
        変更
      </button>
    </div>
  );
};
