import React from "react";
import styles from "../Main.module.scss";

import { useDispatch } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

import { User } from "types/user";

interface PropType {
  user: User;
}

export const Type: React.FC<PropType> = ({ user }) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(
      rootSlice.handleModal({
        type: "application",
      })
    );
  };

  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>タイプ</span>
        <span className={styles.main_value}>
          {!(user?.payment?.status !== "canceled" && !user?.payment?.price)
            ? user?.type === "individual"
              ? "個人"
              : "法人"
            : "エキストラ"}
        </span>

        {user?.application && (
          <span className={styles.main_desc}>
            申請が承認されるまで翌３営業日程掛かる場合がございます
          </span>
        )}
        {(user?.type !== "individual" ||
          (!user?.payment?.price && user?.payment?.status !== "canceled")) && (
          <span className={styles.main_desc}>変更することはできません</span>
        )}
      </div>

      <button
        className={`${styles.main_btn} ${
          (user?.type !== "individual" ||
            user?.application ||
            (!user?.payment?.price && user?.payment?.status !== "canceled")) &&
          styles.main_btn_disabled
        }
        `}
        type="button"
        onClick={handleOpen}
      >
        {user?.application ? "申請済み" : "変更"}
      </button>
    </div>
  );
};
