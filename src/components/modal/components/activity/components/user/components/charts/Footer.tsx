import { Span } from "components/modal/components/activity/Activity";
import { Activity } from "features/user/initialState";
import React from "react";
import styles from "./Charts.module.scss";

interface PropType {
  layout: "line" | "number" | "none";
  span?: Span;
  data?: Activity[number];
}

export const Footer: React.FC<PropType> = ({ layout, span, data }) => {
  return layout !== "number" && layout !== "none" ? (
    data?.name !== "distributions" && data?.name !== "approval" ? (
      <div
        className={`
          ${styles.chart_container} 
          ${styles.chart_container_footer}
        `}
      >
        <span className={styles.chart_day}>{data?.log[0].label}</span>
        <span className={styles.chart_day}>
          {span === "total" || span === "day"
            ? "今日"
            : span === "week"
            ? "今週"
            : "今月"}
        </span>
      </div>
    ) : (
      <div
        className={`
          ${styles.chart_container} 
          ${styles.chart_container_footer}
        `}
      >
        <span className={styles.chart_day}>最小</span>
        <span className={styles.chart_day}>最大</span>
      </div>
    )
  ) : (
    <></>
  );
};
