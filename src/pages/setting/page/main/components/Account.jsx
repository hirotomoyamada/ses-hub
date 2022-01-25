import styles from "../Main.module.scss";

export const Account = ({ user, history }) => {
  return user.type === "parent" ? (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>グループアカウント</span>
        <span className={styles.main_value}>
          {user?.payment?.status !== "canceled" && user?.payment?.account
            ? user?.payment?.account - user?.payment?.children?.length - 1
            : 0}
          &nbsp;アカウントまで作成できます
        </span>
        {user?.provider && user.provider.indexOf("password") < 0 && (
          <span className={styles.main_desc}>
            メールログインを有効にする必要があります
          </span>
        )}
        {user?.payment?.status === "canceled" && (
          <span className={styles.main_desc}>
            プランを選択する必要があります
          </span>
        )}
      </div>

      <button
        className={`${styles.main_btn} ${
          ((user?.provider && user.provider.indexOf("password") < 0) ||
            user?.payment?.status === "canceled") &&
          styles.main_btn_disabled
        }`}
        type="button"
        onClick={() => history.push("/account")}
      >
        管理
      </button>
    </div>
  ) : (
    <></>
  );
};
