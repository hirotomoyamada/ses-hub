import React from "react";
import styles from "./Charts.module.scss";

import { Span } from "components/modal/components/analytics/Analytics";
import { Analytics } from "features/user/initialState";
import { Setting } from "types/user";
import { NestedPartial } from "types/utils";

interface PropType {
  setting?: NestedPartial<Setting>;
  span?: Span;
  data?: Analytics[number];
}

export const Footer: React.FC<PropType> = ({ setting, span, data }) => {
  return setting?.analytics?.layout !== "number" &&
    setting?.analytics?.layout !== "none" ? (
    data?.key !== "distribution" && data?.key !== "approval" ? (
      <div
        className={`
          ${styles.chart_container} 
          ${styles.chart_container_footer}
        `}
      >
        <span className={styles.chart_day}>
          {data && [...data.log].reverse()[0].label}
        </span>
        <span className={styles.chart_day}>
          {span === "day" ? "今日" : span === "week" ? "今週" : "今月"}
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
