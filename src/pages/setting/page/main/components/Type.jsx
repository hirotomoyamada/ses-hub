import styles from "../Main.module.scss";

import { useDispatch } from "react-redux";
import * as rootSlice from "../../../../../features/root/rootSlice";

export const Type = ({ user }) => {
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

        {/* ver 2.0.1 */}
        {/* {user?.application && (
          <span className={styles.main_desc}>
            申請が承認されるまで翌３営業日程掛かる場合がございます
          </span>
        )} */}
        {/* {(user?.type !== "individual" ||
          (!user?.payment?.price && user?.payment?.status !== "canceled")) && (
          <span className={styles.main_desc}>変更することはできません</span>
        )} */}

        <span className={styles.main_desc}>変更することはできません</span>
      </div>

      {/* ver 2.0.1 */}
      {/* <button
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
      </button> */}

      <button
        className={`${styles.main_btn} ${styles.main_btn_disabled}`}
        type="button"
        onClick={handleOpen}
      >
        変更
      </button>
    </div>
  );
};
