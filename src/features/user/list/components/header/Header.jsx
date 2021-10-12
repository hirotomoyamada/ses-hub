import styles from "./Header.module.scss";

import * as rootSlice from "../../../../root/rootSlice";

export const Header = ({ dispatch, index, outputs, selectOutputs }) => {
  const handleIndex = (index) => {
    window.scrollTo(0, 0);
    dispatch(rootSlice.handleIndex(index));
  };

  return !outputs ? (
    <div className={styles.header}>
      <button
        onClick={() => handleIndex("matters")}
        className={`${styles.header_btn} ${
          index === "matters" && styles.header_btn_active
        }`}
      >
        案件
      </button>
      <button
        onClick={() => handleIndex("resources")}
        className={`${styles.header_btn} ${
          index === "resources" && styles.header_btn_active
        }`}
      >
        人材
      </button>
    </div>
  ) : (
    <div className={`${styles.header} ${styles.header_outputs}`}>
      <span className={styles.header_outputs_txt}>
        {selectOutputs.length}件&nbsp;選択中
      </span>
    </div>
  );
};
