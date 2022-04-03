import React from "react";
import styles from "../Main.module.scss";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

import * as rootSlice from "features/root/rootSlice";
import { User } from "types/user";

interface PropType {
  user: User;
}

export const Editor: React.FC<PropType> = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSetting = (): void => {
    navigate("/setting");
  };

  return (
    <div className={styles.main_edit}>
      <div className={styles.main_edit_outer}>
        <button
          type="button"
          onClick={() =>
            user?.payment?.status !== "canceled"
              ? dispatch(rootSlice.handleModal({ type: "activity" }))
              : dispatch(
                  rootSlice.handleAnnounce({
                    error: "プランを選択する必要があります",
                  })
                )
          }
          className={`${styles.main_edit_btn} ${styles.main_edit_btn_activity} ${styles.main_edit_btn_activity}`}
        >
          <FontAwesomeIcon
            icon={faChartSimple as IconProp}
            className={styles.profile_icon}
          />
        </button>
      </div>

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
    </div>
  );
};
