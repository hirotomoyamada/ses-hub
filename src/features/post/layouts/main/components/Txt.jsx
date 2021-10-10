import styles from "../Main.module.scss";

export const Txt = ({ tag, txt, none, end, txtarea, location }) => {
  return txt ? (
    <div className={`${styles.main_col} ${none && styles.main_col_none}`}>
      <span className={styles.main_tag}>{tag}</span>
      <p className={txtarea && styles.main_txtarea}>
        {!location ? txt : `${txt.area} ${txt.place}`}
        {end && txt !== "その他" && end}
      </p>
    </div>
  ) : (
    <></>
  );
};
