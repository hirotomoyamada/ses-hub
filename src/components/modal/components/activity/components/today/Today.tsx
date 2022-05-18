import React from "react";
import styles from "./Today.module.scss";

import CountUp from "react-countup";

import { Activity } from "features/post/initialState";
import { User } from "types/user";

interface PropType {
  today?: Activity["today"];
  user: User;
}

export const Today: React.FC<PropType> = ({ today, user }) => {
  const canceled = user.payment.status === "canceled";

  const Counter = ({ end }: { end: number | undefined }): JSX.Element => {
    return !isNaN(Number(end)) ? (
      <CountUp
        className={styles.today_count}
        start={0}
        end={end as number}
        separator=","
        duration={3}
        useEasing={true}
      />
    ) : (
      <></>
    );
  };

  return (
    <div className={styles.today}>
      <p className={styles.today_ttl}>今日</p>

      <div className={styles.today_container}>
        <div className={styles.today_wrap}>
          <p className={styles.today_txt}>閲覧数</p>

          <Counter end={today?.histories} />
        </div>

        <div className={styles.today_wrap}>
          <p className={styles.today_txt}>いいねされた数</p>

          {!canceled ? (
            <Counter end={today?.likes} />
          ) : (
            <span className={styles.today_none}>?</span>
          )}
        </div>

        <div className={styles.today_wrap}>
          <p className={styles.today_txt}>出力された数</p>

          {!canceled ? (
            <Counter end={today?.outputs} />
          ) : (
            <span className={styles.today_none}>?</span>
          )}
        </div>

        <div className={styles.today_wrap}>
          <p className={styles.today_txt}>問い合わせされた数</p>

          {!canceled ? (
            <Counter end={today?.entries} />
          ) : (
            <span className={styles.today_none}>?</span>
          )}
        </div>
      </div>
    </div>
  );
};
