import React from "react";
import styles from "./Sort.module.scss";

import * as Activity from "components/modal/components/activity/Activity";

interface PropType {
  sort: Activity.Sort;
  setSort: React.Dispatch<React.SetStateAction<Activity.Sort>>;
}

export const Sort: React.FC<PropType> = ({ sort, setSort }) => {
  return (
    <div className={styles.sort}>
      <button
        type="button"
        className={`${styles.sort_btn} ${sort.self && styles.sort_btn_self} ${
          !sort.others && styles.sort_btn_disabled
        }`}
        onClick={() => setSort({ self: !sort.self, others: sort.others })}
      >
        した数
      </button>
      <button
        type="button"
        className={`${styles.sort_btn} ${
          sort.others && styles.sort_btn_others
        } ${!sort.self && styles.sort_btn_disabled}`}
        onClick={() => setSort({ self: sort.self, others: !sort.others })}
      >
        された数
      </button>
    </div>
  );
};
