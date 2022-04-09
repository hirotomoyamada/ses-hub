import React from "react";
import styles from "./Sort.module.scss";

import * as Activity from "components/modal/components/activity/Activity";
import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

interface PropType {
  sort: Activity.Sort;
  setSort: React.Dispatch<React.SetStateAction<Activity.Sort>>;
}

export const Sort: React.FC<PropType> = ({ sort, setSort }) => {
  const setting = useSelector(rootSlice.setting);

  return (
    <div className={styles.sort}>
      <button
        type="button"
        className={`
          ${styles.sort_btn}
          ${!sort.others && styles.sort_btn_disabled}
        `}
        style={
          sort.self
            ? {
                background: setting?.activity.color.self || "#49b657",
                borderRadius: "20px 0 0 20px",
                color: "#FFF",
              }
            : undefined
        }
        onClick={() => setSort({ self: !sort.self, others: sort.others })}
      >
        した数
      </button>
      <button
        type="button"
        className={`
          ${styles.sort_btn}
          ${!sort.self && styles.sort_btn_disabled}
        `}
        style={
          sort.others
            ? {
                background: setting?.activity.color.others || "#ff9900",
                borderRadius: " 0 20px 20px 0",
                color: "#FFF",
              }
            : undefined
        }
        onClick={() => setSort({ self: sort.self, others: !sort.others })}
      >
        された数
      </button>
    </div>
  );
};
