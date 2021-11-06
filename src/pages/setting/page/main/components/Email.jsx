import styles from "../Main.module.scss";

export const Email = ({ user, email, setEmail }) => {
  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>メールアドレス</span>
        <span className={styles.main_value}>
          {user?.profile?.email && user.profile.email}
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
        onClick={() => setEmail(!email)}
      >
        変更
      </button>
    </div>
  );
};
