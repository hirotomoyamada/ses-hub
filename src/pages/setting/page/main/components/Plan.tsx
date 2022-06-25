import React from "react";
import styles from "../Main.module.scss";
import * as functions from "functions";

import { User } from "types/user";
import { NavigateFunction } from "react-router-dom";

interface PropType {
  user: User;
  navigate: NavigateFunction;
}

export const Plan: React.FC<PropType> = ({ user, navigate }) => {
  return (
    <div className={styles.main_row}>
      <div className={styles.main_col}>
        <span className={styles.main_tag}>プラン</span>
        <span className={styles.main_value}>
          {user?.type !== "individual" && user?.payment?.status === "canceled"
            ? "未加入"
            : user?.payment?.status === "active"
            ? "レギュラー"
            : user?.payment?.status === "trialing"
            ? "レギュラー(フリートライアル)"
            : "リミテッド"}
          &nbsp;&nbsp;
          {user?.payment?.end && (
            <span className={styles.main_value_time}>
              期限：
              {functions.root.timestamp(user?.payment?.end, "day")}
            </span>
          )}
        </span>
        {((user?.payment?.status !== "canceled" && !user?.payment?.price) ||
          user?.type === "child") && (
          <span className={styles.main_desc}>
            このアカウントでは変更することはできません
          </span>
        )}
      </div>

      <button
        className={`${styles.main_btn} ${
          ((user?.payment?.status !== "canceled" && !user?.payment?.price) ||
            user?.type === "child") &&
          styles.main_btn_disabled
        }`}
        type="button"
        onClick={() => navigate("/plan")}
      >
        変更
      </button>
    </div>
  );
};
