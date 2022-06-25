import React from "react";
import styles from "./History.module.scss";

import CountUp from "react-countup";

import { Activity } from "features/post/initialState";

interface PropType {
  total?: Activity["total"];
}

export const History: React.FC<PropType> = ({ total }) => {
  const end = !isNaN(Number(total?.histories));

  return (
    <div className={styles.history}>
      <p className={styles.history_ttl}>すべての閲覧数</p>

      {end ? (
        <CountUp
          className={styles.history_count}
          start={0}
          end={total?.histories as number}
          separator=","
          duration={3}
          useEasing={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
