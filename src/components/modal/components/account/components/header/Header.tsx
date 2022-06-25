import React from "react";
import styles from "./Header.module.scss";

interface PropType {
  handleClose: () => void;
}

export const Header: React.FC<PropType> = ({ handleClose }) => {
  return (
    <div className={styles.header}>
      <button
        type="button"
        className={styles.header_cancel}
        onClick={handleClose}
      >
        キャンセル
      </button>
    </div>
  );
};
