import React from "react";
import styles from "../Main.module.scss";

import { User } from "types/user";
import { useDispatch } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

interface PropType {
  user: User;
}

export const Activity: React.FC<PropType> = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>アクティビティ</span>
        {user?.payment?.status === "canceled" && (
          <span className={styles.main_desc}>
            プランを選択する必要があります
          </span>
        )}
      </div>

      <button
        className={`${styles.main_btn} ${
          user?.payment?.status === "canceled" && styles.main_btn_disabled
        }`}
        type="button"
        onClick={() => dispatch(rootSlice.handleModal({ type: "activity" }))}
      >
        表示
      </button>
    </div>
  );
};
