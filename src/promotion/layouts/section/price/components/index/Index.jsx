import styles from "./Index.module.scss";

export const Index = ({ index, setIndex }) => {
  return (
    <div className={styles.index}>
      <button
        type="button"
        className={`${styles.index_btn} ${
          index === "individual" && styles.index_btn_current
        }`}
        onClick={() => setIndex("individual")}
      >
        個人
      </button>
      <button
        type="button"
        className={`${styles.index_btn} ${
          index === "corporate" && styles.index_btn_current
        }`}
        onClick={() => setIndex("corporate")}
      >
        法人
      </button>
    </div>
  );
};
