import React from "react";
import styles from "./Advertise.module.scss";

import { Link } from "react-router-dom";

import { User } from "types/user";

interface PropType {
  user: User;
}

export const Advertise: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.advertise}>
      <div className={styles.advertise_header}>
        <span className={styles.advertise_desc}>
          {user?.payment?.trial
            ? "\\ キャンペーン中 /"
            : "\\ メンバーたちと一緒に /"}
        </span>
        <p className={styles.advertise_ttl}>
          {user?.payment?.trial
            ? "フリートライアル"
            : "案件・人材を共有しませんか？"}
        </p>
      </div>

      <Link to={"/plan"} className={styles.advertise_btn}>
        プランを見る
      </Link>

      {user?.payment?.trial ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/lets.svg`}
          alt=""
          className={styles.advertise_bg}
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/img/app/advertise.svg`}
          alt=""
          className={`${styles.advertise_bg} ${styles.advertise_bg_people}`}
        />
      )}
    </div>
  );
};
