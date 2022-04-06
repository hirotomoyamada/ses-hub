import React from "react";
import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <p className={styles.header_ttl}>データを出力する</p>
    </div>
  );
};
