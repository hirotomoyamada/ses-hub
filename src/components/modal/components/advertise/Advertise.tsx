import React from "react";
import styles from "./Advertise.module.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import * as userSlice from "features/user/userSlice";

import { User } from "types/user";

interface PropType {
  user: User;
  text: string | undefined;
  handleClose: () => void;
  close?: () => void;
}

export const Advertise: React.FC<PropType> = ({
  user,
  text,
  close,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (): void => {
    navigate("/plan");
    dispatch(userSlice.updateNotice());
  };

  return (
    <div className={styles.advertise}>
      <button
        type="button"
        className={styles.advertise_back}
        onClick={!close ? handleClose : close}
      >
        今はしない
      </button>

      <div
        className={`${styles.advertise_header} ${
          text && styles.advertise_header_account
        }`}
      >
        {!text && (
          <span className={styles.advertise_desc}>
            {user?.payment?.trial
              ? "\\ キャンペーン中 /"
              : "\\ メンバーたちと一緒に /"}
          </span>
        )}
        <p className={styles.advertise_ttl}>
          {!text
            ? user?.payment?.trial
              ? "フリートライアル"
              : "案件・人材を共有しませんか？"
            : text}
        </p>
      </div>

      <button
        type="button"
        className={styles.advertise_btn}
        onClick={handleOpen}
      >
        プランを見る
      </button>

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
