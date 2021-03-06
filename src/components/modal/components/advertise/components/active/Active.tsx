import React from "react";
import styles from "./Active.module.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import * as userSlice from "features/user/userSlice";
import { User } from "types/user";

interface PropType {
  user: User;
  text?: string;
  handleClose: () => void;
  close?: () => void;
}

export const Active: React.FC<PropType> = ({
  user,
  text,
  handleClose,
  close,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (): void => {
    navigate("/plan");
    dispatch(userSlice.updateNotice());
  };

  return (
    <div className={styles.active}>
      <button
        type="button"
        className={styles.active_back}
        onClick={!close ? handleClose : close}
      >
        今はしない
      </button>

      <div
        className={`${styles.active_header} ${
          text && styles.active_header_account
        }`}
      >
        {!text && (
          <span className={styles.active_desc}>
            {user?.payment?.trial
              ? "\\ キャンペーン中 /"
              : "\\ メンバーたちと一緒に /"}
          </span>
        )}
        <p className={styles.active_ttl}>
          {!text
            ? user?.payment?.trial
              ? "フリートライアル"
              : "案件・人材を共有しませんか？"
            : text}
        </p>
      </div>

      <button type="button" className={styles.active_btn} onClick={handleOpen}>
        プランを見る
      </button>

      {!user?.payment?.trial ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/lets.svg`}
          alt=""
          className={styles.active_bg}
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/img/app/advertise.svg`}
          alt=""
          className={`${styles.active_bg} ${styles.active_bg_people}`}
        />
      )}
    </div>
  );
};
