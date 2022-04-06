import React from "react";
import styles from "./Save.module.scss";
export const Save: React.FC = () => {
  return (
    <button type="submit" className={styles.save}>
      保存
    </button>
  );
};
