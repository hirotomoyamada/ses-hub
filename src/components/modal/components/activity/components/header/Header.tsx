import React from "react";
import styles from "./Header.module.scss";

interface PropType {
  handleClose: () => void;
}

export const Header: React.FC<PropType> = ({ handleClose }) => {
  return (
    <div className={`${styles.header}`}>
      <button onClick={handleClose} className={styles.header_cancel}>
        とじる
      </button>

      <p className={`${styles.header_ttl}`}>アクティビティ</p>
    </div>
  );
};
