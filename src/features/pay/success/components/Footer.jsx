import styles from "../Success.module.scss";

export const Footer = ({ load, handleRedirect }) => {
  return !load ? (
    <div className={styles.success_footer}>
      <button
        type="button"
        onClick={() => handleRedirect("/home")}
        className={styles.success_footer_btn}
      >
        ホーム
      </button>
      <button
        type="button"
        onClick={() => handleRedirect("/setting")}
        className={styles.success_footer_btn}
      >
        アカウント設定
      </button>
    </div>
  ) : (
    <></>
  );
};
