import React from "react";
import styles from "./View.module.scss";

import CountUp from "react-countup";

interface PropType {
  total: Record<string, number>;
}

export const View: React.FC<PropType> = ({ total }) => {
  return (
    <div className={styles.view}>
      <p className={styles.view_ttl}>閲覧数</p>

      <CountUp
        className={styles.view_count}
        start={0}
        end={total.views}
        separator=","
        duration={3}
        useEasing={true}
      />
    </div>
  );
};
