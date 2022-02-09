import styles from "../Main.module.scss";

export const Period = ({ period, matters, resources }) => {
  return (
    <div className={styles.main_col}>
      <span className={styles.main_tag}>
        {matters ? "開始時期" : resources && "稼働開始時期"}
      </span>
      <p>
        {period?.year}年&nbsp;{period?.month}月予定
      </p>
    </div>
  );
};
