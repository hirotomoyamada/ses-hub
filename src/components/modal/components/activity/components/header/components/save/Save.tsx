import React from "react";
import styles from "./Save.module.scss";

interface PropType {
  verification: boolean;
}

export const Save: React.FC<PropType> = ({ verification }) => {
  return (
    <button
      type="submit"
      className={`${styles.save} ${!verification && styles.save_disabled}`}
      form="setting"
    >
      保存
    </button>
  );
};
