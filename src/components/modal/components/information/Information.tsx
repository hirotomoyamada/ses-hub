import React from "react";
import styles from "./Information.module.scss";

import { useSelector } from "react-redux";
import * as rootSlice from "features/root/rootSlice";

import * as functions from "functions";

interface PropType {
  handleClose: () => void;
}

export const Information: React.FC<PropType> = ({ handleClose }) => {
  const info = useSelector(rootSlice.data)?.information;

  return (
    <div className={styles.info}>
      <span className={styles.info_time}>
        {info && functions.root.timestamp(info.updateAt)}
      </span>

      <span className={styles.info_title}>{info?.title}</span>

      <div className={styles.info_body}>{info?.body}</div>

      <button type="button" className={styles.info_btn} onClick={handleClose}>
        とじる
      </button>
    </div>
  );
};
