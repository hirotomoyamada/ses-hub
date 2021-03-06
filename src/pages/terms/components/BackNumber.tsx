import React from "react";
import { backnumber } from "../data/backnumber";
import styles from "../Terms.module.scss";

export const BackNumber: React.FC = () => {
  return (
    <div className={styles.terms_backnumber}>
      {backnumber.map((date, index) => (
        <span key={index}>{date}</span>
      ))}
    </div>
  );
};
