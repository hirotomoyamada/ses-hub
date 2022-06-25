import React from "react";
import styles from "./NotSupported.module.scss";

export const NotSupported: React.FC = () => {
  return (
    <div className={styles.root}>
      <p>このアプリは Internet Explorer に対応しておりません</p>
    </div>
  );
};
