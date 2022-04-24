import React from "react";
import styles from "./Save.module.scss";

export const Save: React.FC = () => {
  return (
    <button type="submit" className={`${styles.save}`} form="setting">
      保存
    </button>
  );
};
