import React from "react";
import styles from "../Main.module.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

import * as rootSlice from "features/root/rootSlice";

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetting = (): void => {
    navigate("/setting");
  };

  return (
    <div className={styles.main_edit}>
      <button
        type="button"
        onClick={handleSetting}
        className={`${styles.main_edit_btn} ${styles.main_edit_btn_account}`}
      >
        アカウント情報
      </button>

      <button
        type="button"
        onClick={() => dispatch(rootSlice.handleModal({ type: "profile" }))}
        className={styles.main_edit_btn}
      >
        プロフィール変更
      </button>

      <button
        type="button"
        onClick={() => dispatch(rootSlice.handleModal({ type: "profile" }))}
        className={styles.main_edit_btn}
      >
        <FontAwesomeIcon
          icon={faChartSimple as IconProp}
          className={styles.profile_icon}
        />
      </button>
    </div>
  );
};
