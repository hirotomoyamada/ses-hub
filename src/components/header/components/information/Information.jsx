import styles from "./Information.module.scss";

import InfoIcon from "@material-ui/icons/Info";

import { useState } from "react";

import { timestamp } from "../../../../functions/timestamp";

export const Information = ({ info }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    document.body.classList.add("lock");
  };
  const handleClose = () => {
    setOpen(!open);
    document.body.classList.remove("lock");
  };
  return (
    <>
      <button type="button" onClick={handleOpen} className={styles.info}>
        <InfoIcon className={styles.info_icon} />
        <span className={styles.info_title}>{info?.title}</span>
      </button>
      
      <div className={open ? styles.open : styles.close}>
        <div className={styles.overlay} onClick={handleClose}></div>

        <div className={styles.popup}>
          <span className={styles.popup_time}>{timestamp(info?.updateAt)}</span>

          <span className={styles.popup_title}>{info?.title}</span>

          <div className={styles.popup_body}>{info?.body}</div>

          <button
            type="button"
            className={styles.popup_btn}
            onClick={handleClose}
          >
            とじる
          </button>
        </div>
      </div>
    </>
  );
};
