import React from "react";
import styles from "./Charts.module.scss";

import CountUp from "react-countup";

import { Activity } from "features/user/initialState";
import { Sort } from "components/modal/components/activity/Activity";

interface PropType {
  sample?: boolean;
  sort?: Sort;
  data?: Activity[number];
}
export const Number: React.FC<PropType> = ({ sample, sort, data }) => {
  return (
    <div className={styles.number}>
      {data?.log
        .map((log, i) => (
          <div key={i} className={styles.number_container}>
            <p className={styles.number_label}>{log.label}</p>

            <div className={styles.number_wrap}>
              {(sample || (sort?.self && log?.self)) && (
                <CountUp
                  className={`${styles.number_total} ${styles.number_total_self}`}
                  start={0}
                  end={log?.self || 0}
                  separator=","
                  duration={1.5}
                  useEasing={true}
                />
              )}

              {(sample || (sort?.others && log?.others)) && (
                <CountUp
                  className={`${styles.number_total} ${styles.number_total_others}`}
                  start={0}
                  end={log?.others || 0}
                  separator=","
                  duration={1.5}
                  useEasing={true}
                />
              )}
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
};
