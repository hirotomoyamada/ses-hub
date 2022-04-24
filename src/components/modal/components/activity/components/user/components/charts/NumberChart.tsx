import React from "react";
import styles from "./Charts.module.scss";

import CountUp from "react-countup";

import { Activity } from "features/user/initialState";
import { Sort } from "components/modal/components/activity/Activity";
import { Setting } from "types/user";
import { NestedPartial } from "types/utils";

interface PropType {
  sample?: boolean;
  setting?: NestedPartial<Setting>;
  sort?: Sort;
  data?: Activity[number];
}
export const NumberChart: React.FC<PropType> = React.memo(
  ({ sample, setting, sort, data }) => {
    return (
      <div className={styles.number}>
        {data?.log.map((log, i) => (
          <div key={i} className={styles.number_container}>
            <p className={styles.number_label}>{log.label}</p>

            <div className={styles.number_wrap}>
              {(sample ||
                (sort?.self &&
                  log?.self !== null &&
                  !isNaN(Number(log?.self)))) && (
                <CountUp
                  className={`${styles.number_total}`}
                  style={{ color: setting?.activity?.color?.self || "#49b657" }}
                  start={0}
                  end={log?.self || 0}
                  separator=","
                  duration={1.5}
                  useEasing={true}
                />
              )}

              {(sample ||
                (sort?.others &&
                  log?.others !== null &&
                  !isNaN(Number(log?.others)))) && (
                <CountUp
                  className={`${styles.number_total}`}
                  style={{
                    color: setting?.activity?.color?.others || "#ff9900",
                  }}
                  start={0}
                  end={log?.others || 0}
                  separator=","
                  duration={1.5}
                  useEasing={true}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);
