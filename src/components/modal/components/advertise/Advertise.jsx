import styles from "./Advertise.module.scss";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { updatePayment } from "../../../../features/user/userSlice";

export const Advertise = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    user?.payment?.status === "canceled" &&
      user?.payment?.notice &&
      setOpen(true);
  }, [user?.payment?.notice, user?.payment?.status]);

  const handleOpen = () => {
    setOpen(false);
    history.push("/plan");
    dispatch(updatePayment("notice"));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(updatePayment("notice"));
  };

  return (
    <div className={open ? styles.open : styles.close}>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles.advertise}>
        <button
          type="button"
          className={styles.advertise_back}
          onClick={handleClose}
        >
          今はしない
        </button>

        <div className={styles.advertise_header}>
          <span className={styles.advertise_desc}>
            {user?.payment?.trial
              ? "\\ 今なら１ヶ月無料 /"
              : "\\ メンバーたちと一緒に /"}
          </span>
          <p className={styles.advertise_ttl}>
            {user?.payment?.trial
              ? "フリートライアル"
              : "案件・人材を共有しませんか？"}
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
    </div>
  );
};
