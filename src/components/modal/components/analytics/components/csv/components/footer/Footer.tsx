import React from "react";
import styles from "./Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <button type="submit" className={styles.footer_btn}>
        ダウンロード
      </button>
    </div>
  );
};
