import styles from "../Main.module.scss";

export const Times = ({ times }) => {
  return (
    <div className={styles.main_col}>
      <span className={styles.main_tag}>時間</span>

      <p>
        {times?.start}&nbsp;〜&nbsp;{times?.end}
      </p>
    </div>
  );
};
