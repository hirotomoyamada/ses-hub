import React, { useEffect, useState } from "react";
import styles from "./Charts.module.scss";

import CountUp from "react-countup";

import { Analytics } from "features/user/initialState";
import { Sort } from "components/modal/components/analytics/Analytics";
import { Setting } from "types/user";
import { NestedPartial } from "types/utils";

interface PropType {
  sample?: boolean;
  setting?: NestedPartial<Setting>;
  sort?: Sort;
  data?: Analytics[number];
}
export const NumberChart: React.FC<PropType> = React.memo(
  ({ sample, setting, sort, data }) => {
    const [log, setLog] = useState<Analytics[number]["log"]>([]);

    useEffect(() => {
      if (!data) return;

      switch (data.key) {
        case "distribution":
        case "approval": {
          const log = Object.keys(data.log[0])
            .map((label) => {
              if (label === "label") return;

              const self = data.log[0][label] || 0;

              return { label, self };
            })
            .filter(
              (data): data is { label: string; self: number } =>
                data !== undefined
            );

          return setLog(log);
        }

        default: {
          const { log } = data;

          return setLog(log);
        }
      }
    }, [data]);

    return (
      <div className={styles.number}>
        {log?.map((log, i) => (
          <div key={i} className={styles.number_container}>
            <p className={styles.number_label}>{log.label}</p>

            <div className={styles.number_wrap}>
              {(sample ||
                (sort?.self &&
                  log?.self !== null &&
                  !isNaN(Number(log?.self)))) && (
                <CountUp
                  className={`${styles.number_total}`}
                  style={{
                    color: setting?.analytics?.color?.self || "#49b657",
                  }}
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
                    color: setting?.analytics?.color?.others || "#ff9900",
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
