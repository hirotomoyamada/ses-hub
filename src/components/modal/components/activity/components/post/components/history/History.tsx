import React from "react";
import styles from "./History.module.scss";

import CountUp from "react-countup";

import { Activity } from "features/post/initialState";

interface PropType {
  total: Activity["total"];
}

export const History: React.FC<PropType> = ({ total }) => {
  return (
    <div className={styles.history}>
      <p className={styles.history_ttl}>閲覧数</p>

      <CountUp
        className={styles.history_count}
        start={0}
        end={total.histories}
        separator=","
        duration={3}
        useEasing={true}
      />
    </div>
  );
};
