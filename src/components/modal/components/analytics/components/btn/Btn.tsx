import React from "react";
import styles from "./Btn.module.scss";

import SettingsIcon from "@material-ui/icons/Settings";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Analytics } from "features/user/initialState";
import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

interface PropType {
  setting: boolean;
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  analytics?: Analytics;
}

export const Btn: React.FC<PropType> = ({ setting, setSetting, analytics }) => {
  const fetch = useSelector(rootSlice.load).fetch;

  return !fetch && analytics?.length ? (
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
  ) : (
    <></>
  );
};
