import { Activity } from "features/user/initialState";
import React from "react";
import styles from "./Charts.module.scss";

interface PropType {
  data: Activity[number];
}

export const Footer: React.FC<PropType> = ({ data }) => {
  return data.name !== "distributions" && data.name !== "approval" ? (
    <div className={styles.chart_container}>
      <span className={styles.chart_day}>{data.log[0].label}</span>
      <span className={styles.chart_day}>今日</span>
    </div>
  ) : (
    <div className={styles.chart_container}>
      <span className={styles.chart_day}>最小</span>
      <span className={styles.chart_day}>最大</span>
    </div>
  );
};
