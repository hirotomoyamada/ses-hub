import styles from "../Auth.module.scss";

export const Verified = ({ email, verified, handleLogout, handleResend }) => {
  return (
    <div className={styles.auth_inner}>
      <span className={styles.auth_ttl}>
        {verified.email
          ? "確認メールを送信しました"
          : verified.status === "disable"
          ? "このアカウントでは\nご利用いただけません"
          : verified.status === "hold" && "ただいま\n承認しております"}
      </span>
      <div className={`${styles.auth_wrap} ${styles.auth_wrap_center}`}>
        <button
          type="button"
          className={`${styles.auth_desc} ${styles.auth_desc_logout} ${styles.auth_desc_logout_verified}`}
          onClick={handleLogout}
        >
          ログイン画面に戻る
        </button>
        {email && (
          <>
            <span className={styles.auth_desc}>|</span>

            <button
              type="button"
              className={`${styles.auth_desc} ${styles.auth_desc_center}`}
              onClick={handleResend}
            >
              確認メールが届きませんか？
            </button>
          </>
        )}
      </div>
    </div>
  );
};
