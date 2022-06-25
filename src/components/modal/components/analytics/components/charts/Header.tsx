import React from "react";
import styles from "./Charts.module.scss";

import CountUp from "react-countup";

import { Sort } from "components/modal/components/analytics/Analytics";
import { Analytics } from "features/user/initialState";
import { Setting } from "types/user";
import { NestedPartial } from "types/utils";

interface PropType {
  setting?: NestedPartial<Setting>;
  sample?: boolean;
  sort?: Sort;
  data?: Analytics[number];
}

export const Header: React.FC<PropType> = ({ setting, sample, sort, data }) => {
  return (
    <div
      className={`
        ${`${styles.chart_container} ${styles.chart_container_header}`}
        ${
          (data?.key === "distribution" || data?.key === "approval") &&
          styles.chart_container_bar
        }
        ${setting?.analytics?.layout === "none" && styles.chart_container_none}
      `}
    >
      <p className={styles.chart_ttl}>{data?.label}</p>

      <div className={styles.chart_wrap}>
        {(sample ||
          (sort?.self &&
            data?.self !== null &&
            !isNaN(Number(data?.self)))) && (
          <CountUp
            className={`${styles.chart_total}`}
            style={{ color: setting?.analytics?.color?.self || "#49b657" }}
            start={0}
            end={data?.self || 0}
            separator=","
            duration={1.5}
            useEasing={true}
          />
        )}

        {(sample ||
          (sort?.others &&
            data?.others !== null &&
            !isNaN(Number(data?.others)))) && (
          <CountUp
            className={`${styles.chart_total}`}
            style={{ color: setting?.analytics?.color?.others || "#ff9900" }}
            start={0}
            end={data?.others || 0}
            separator=","
            duration={1.5}
            useEasing={true}
          />
        )}
      </div>
    </div>
  );
};
