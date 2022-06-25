import React from "react";
import styles from "../Main.module.scss";

import { Matter } from "types/post";

interface PropType {
  interviews: Matter["interviews"];
  none?: boolean;
}

export const Interviews: React.FC<PropType> = ({ interviews, none }) => {
  return (
    <div className={`${styles.main_col} ${none && styles.main_col_none}`}>
      <span className={styles.main_tag}>面談</span>
      <p>
        {interviews?.type}&nbsp;{interviews?.count}
      </p>
    </div>
  );
};
