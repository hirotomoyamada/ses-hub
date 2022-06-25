import React from "react";
import styles from "./Command.module.scss";

import CountUp from "react-countup";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { Activity } from "features/post/initialState";
import { User } from "types/user";

interface PropType {
  total?: Activity["total"];
  user: User;
}

export const Command: React.FC<PropType> = ({ total, user }) => {
  const canceled = user.payment.status === "canceled";

  const Counter = ({ end }: { end: number | undefined }): JSX.Element => {
    return !isNaN(Number(end)) ? (
      <CountUp
        className={styles.command_count}
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
    <div className={styles.command}>
      <div className={styles.command_wrap}>
        <FavoriteBorderIcon className={styles.command_icon} />
        {!canceled ? (
          <Counter end={total?.likes} />
        ) : (
          <span className={styles.command_none}>?</span>
        )}
      </div>

      <div className={styles.command_wrap}>
        <LaunchIcon className={styles.command_icon} />
        {!canceled ? (
          <Counter end={total?.outputs} />
        ) : (
          <span className={styles.command_none}>?</span>
        )}
      </div>

      <div className={styles.command_wrap}>
        <CheckCircleOutlineIcon className={styles.command_icon} />
        {!canceled ? (
          <Counter end={total?.entries} />
        ) : (
          <span className={styles.command_none}>?</span>
        )}
      </div>
    </div>
  );
};
