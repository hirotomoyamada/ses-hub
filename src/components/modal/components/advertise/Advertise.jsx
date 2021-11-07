import styles from "./Advertise.module.scss";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as userSlice from "../../../../features/user/userSlice";

export const Advertise = ({ user, handleClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOpen = () => {
    history.push("/plan");
    dispatch(userSlice.updatePayment("notice"));
  };

  return (
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
            ? "\\ キャンペーン中 /"
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
  );
};
