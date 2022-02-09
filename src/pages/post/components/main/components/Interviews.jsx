import styles from "../Main.module.scss";

export const Interviews = ({ interviews, none }) => {
  return (
    <div className={`${styles.main_col} ${none && styles.main_col_none}`}>
      <span className={styles.main_tag}>面談</span>
      <p>
        {interviews?.type}&nbsp;{interviews?.count}
      </p>
    </div>
  );
};
