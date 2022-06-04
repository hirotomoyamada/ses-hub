import React from "react";
import styles from "./Analytics.module.scss";

import { useNavigate } from "react-router";

import { User } from "types/user";

interface PropType {
  user: User;
  handleClose: () => void;
  close?: () => void;
}

export const Analytics: React.FC<PropType> = ({ user, handleClose, close }) => {
  const navigate = useNavigate();

  const handleOpen = (): void => {
    navigate("/plan");
    !close ? handleClose() : close();
  };

  return (
    <div className={styles.analytics}>
      <button
        type="button"
        className={styles.analytics_back}
        onClick={!close ? handleClose : close}
      >
        今はしない
      </button>

      <div className={`${styles.analytics_header}`}>
        <span className={styles.analytics_desc}>\ アナリティクス /</span>

        <p className={styles.analytics_ttl}>データ分析でわかりやすい</p>
      </div>

      <button
        type="button"
        className={`${styles.analytics_btn} ${
          user.type !== "parent" && styles.analytics_btn_disabled
        }`}
        onClick={handleOpen}
      >
        {user.payment.status !== "canceled" ? "オプション" : "プラン"}を見る
      </button>

      {user.type === "child" && (
        <span className={styles.analytics_none}>
          このアカウントではプランを選択できません
        </span>
      )}

      <img
        src={`${process.env.PUBLIC_URL}/img/app/analytics.svg`}
        alt=""
        className={styles.analytics_bg}
      />

      <img
        src={`${process.env.PUBLIC_URL}/img/app/barchart.svg`}
        alt=""
        className={styles.analytics_chart}
      />
    </div>
  );
};
