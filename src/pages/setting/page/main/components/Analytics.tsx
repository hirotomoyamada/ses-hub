import React from "react";
import styles from "../Main.module.scss";

import { User } from "types/user";
import { useDispatch } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

interface PropType {
  user: User;
}

export const Analytics: React.FC<PropType> = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>アナリティクス</span>
        {user.type === "individual" && !user.payment.option?.analytics && (
          <span className={styles.main_desc}>
            {user?.payment?.status !== "canceled"
              ? "オプション"
              : "プランとオプション"}
            を選択する必要があります
          </span>
        )}

        {user.type !== "individual" && user?.payment?.status === "canceled" && (
          <span className={styles.main_desc}>
            プランを選択する必要があります
          </span>
        )}
      </div>

      <button
        className={`${styles.main_btn}`}
        type="button"
        onClick={() =>
          user.payment.status !== "canceled" &&
          (user.type !== "individual" || user.payment.option?.analytics)
            ? dispatch(
                rootSlice.handleModal({
                  type: "analytics",
                })
              )
            : dispatch(
                rootSlice.handleModal({
                  type: "advertise",
                  meta: { type: "analytics" },
                })
              )
        }
      >
        表示
      </button>
    </div>
  );
};
