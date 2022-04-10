import React from "react";
import styles from "./Command.module.scss";

import CountUp from "react-countup";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { Activity } from "features/post/initialState";

interface PropType {
  total?: Activity["total"];
}

export const Command: React.FC<PropType> = ({ total }) => {
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
        <Counter end={total?.likes} />
      </div>

      <div className={styles.command_wrap}>
        <LaunchIcon className={styles.command_icon} />
        <Counter end={total?.outputs} />
      </div>

      <div className={styles.command_wrap}>
        <CheckCircleOutlineIcon className={styles.command_icon} />
        <Counter end={total?.entries} />
      </div>
    </div>
  );
};
