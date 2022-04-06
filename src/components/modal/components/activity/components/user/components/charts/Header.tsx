import React from "react";
import styles from "./Charts.module.scss";

import CountUp from "react-countup";
import { Span, Sort } from "components/modal/components/activity/Activity";
import { Activity } from "features/user/initialState";

interface PropType {
  layout: "line" | "number" | "none";
  sample?: boolean;
  span?: Span;
  sort?: Sort;
  data?: Activity[number];
}

export const Header: React.FC<PropType> = ({
  layout,
  sample,
  sort,
  span,
  data,
}) => {
  return (
    <div
      className={`
        ${`${styles.chart_container} ${styles.chart_container_header}`}
        ${
          (data?.name === "distributions" || data?.name === "approval") &&
          styles.chart_container_bar
        }
        ${layout === "none" && styles.chart_container_none}
      `}
    >
      <p className={styles.chart_ttl}>{data?.label}</p>

      <div className={styles.chart_wrap}>
        {(sample || (sort?.self && data?.self)) && (
          <CountUp
            className={`${styles.chart_total} ${styles.chart_total_self}`}
            start={0}
            end={
              span === "day"
                ? data?.log[data?.log.length - 1].self || 0
                : data?.self || 0
            }
            separator=","
            duration={1.5}
            useEasing={true}
          />
        )}

        {(sample || (sort?.others && data?.others)) && (
          <CountUp
            className={`${styles.chart_total} ${styles.chart_total_others}`}
            start={0}
            end={
              span === "day"
                ? data?.log[data?.log.length - 1].others || 0
                : data?.others || 0
            }
            separator=","
            duration={1.5}
            useEasing={true}
          />
        )}
      </div>
    </div>
  );
};
