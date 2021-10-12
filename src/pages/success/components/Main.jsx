import styles from "../Success.module.scss";

export const Main = ({ load }) => {
  return load ? (
    <div className={styles.success_main}>
      <img
        src={`${process.env.PUBLIC_URL}/img/app/process.svg`}
        alt=""
        className={styles.success_main_img}
      />
      <div className={styles.success_main_wrap}>
        <span>しばらく、お待ちください。</span>
        <span>画面を閉じたり、遷移しないでください。</span>
      </div>
    </div>
  ) : (
    <div className={styles.success_main}>
      <img
        src={`${process.env.PUBLIC_URL}/img/app/success.svg`}
        alt=""
        className={styles.success_main_img}
      />
    </div>
  );
};
