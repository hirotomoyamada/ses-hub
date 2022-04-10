import React from "react";
import styles from "./Today.module.scss";

import CountUp from "react-countup";

import { Activity } from "features/post/initialState";

interface PropType {
  today: Activity["today"];
}

export const Today: React.FC<PropType> = ({ today }) => {
  return (
    <div className={styles.today}>
      <p className={styles.today_ttl}>今日</p>

      <div className={styles.today_container}>
        <div className={styles.today_wrap}>
          <p className={styles.today_txt}>閲覧数</p>

          <CountUp
            className={styles.today_count}
            start={0}
            end={today.histories}
            separator=","
            duration={3}
            useEasing={true}
          />
        </div>

        <div className={styles.today_wrap}>
          <p className={styles.today_txt}>いいねされた数</p>

          <CountUp
            className={styles.today_count}
            start={0}
            end={today.likes}
            separator=","
            duration={3}
            useEasing={true}
          />
        </div>

        <div className={styles.today_wrap}>
          <p className={styles.today_txt}>出力された数</p>

          <CountUp
            className={styles.today_count}
            start={0}
            end={today.outputs}
            separator=","
            duration={3}
            useEasing={true}
          />
        </div>

        <div className={styles.today_wrap}>
          <p className={styles.today_txt}>問い合わせされた数</p>

          <CountUp
            className={styles.today_count}
            start={0}
            end={today.entries}
            separator=","
            duration={3}
            useEasing={true}
          />
        </div>
      </div>
    </div>
  );
};
