import React from "react";
import styles from "./Btn.module.scss";

import SettingsIcon from "@material-ui/icons/Settings";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

interface PropType {
  setting: boolean;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Btn: React.FC<PropType> = ({ setting, setSetting }) => {
  return (
    <button
      onClick={() => setSetting(!setting)}
      type="button"
      className={styles.btn}
    >
      {!setting ? (
        <SettingsIcon className={styles.btn_icon} />
      ) : (
        <ArrowBackIosIcon
          className={`${styles.btn_icon} ${styles.btn_icon_back}`}
        />
      )}
    </button>
  );
};
