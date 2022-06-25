import React from "react";
import styles from "../Main.module.scss";

import { Matter } from "types/post";

interface PropType {
  times: Matter["times"];
}

export const Times: React.FC<PropType> = ({ times }) => {
  return (
    <div className={styles.main_col}>
      <span className={styles.main_tag}>時間</span>

      <p>
        {times?.start}&nbsp;〜&nbsp;{times?.end}
      </p>
    </div>
  );
};
