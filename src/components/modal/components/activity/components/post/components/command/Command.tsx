import React from "react";
import styles from "./Command.module.scss";

import CountUp from "react-countup";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LaunchIcon from "@material-ui/icons/Launch";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { Activity } from "features/post/initialState";

interface PropType {
  total: Activity["total"];
}

export const Command: React.FC<PropType> = ({ total }) => {
  return (
    <div className={styles.command}>
      <div className={styles.command_wrap}>
        <FavoriteBorderIcon className={styles.command_icon} />

        <CountUp
          className={styles.command_count}
          start={0}
          end={total.likes}
          separator=","
          duration={3}
          useEasing={true}
        />
      </div>

      <div className={styles.command_wrap}>
        <LaunchIcon className={styles.command_icon} />

        <CountUp
          className={styles.command_count}
          start={0}
          end={total.outputs}
          separator=","
          duration={3}
          useEasing={true}
        />
      </div>

      <div className={styles.command_wrap}>
        <CheckCircleOutlineIcon className={styles.command_icon} />

        <CountUp
          className={styles.command_count}
          start={0}
          end={total.entries}
          separator=","
          duration={3}
          useEasing={true}
        />
      </div>
    </div>
  );
};
