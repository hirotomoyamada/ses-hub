import styles from "./Agree.module.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import * as userSlice from "../../features/user/userSlice";

import { timestamp } from "../../functions/timestamp";

export const Agree = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const agree = useSelector(userSlice.data).agree;
  const verification = useSelector(userSlice.verified).agree;

  useEffect(() => {
    verification &&
    location?.pathname !== "/asct" &&
    location?.pathname !== "/terms"
      ? document.body.classList.add("lock")
      : document.body.classList.remove("lock");
  }, [location, verification]);

  const handleAgree = () => {
    dispatch(userSlice.enableAgree());
  };

  return (
    <div
      className={
        verification &&
        location?.pathname !== "/asct" &&
        location?.pathname !== "/terms"
          ? styles.open
          : styles.close
      }
    >
      <div className={styles.overlay}></div>

      <div className={styles.agree}>
        <span className={styles.agree_time}>{timestamp(agree?.updateAt)}</span>

        <span className={styles.agree_title}>{agree?.title}</span>

        <div className={styles.agree_body}>{agree?.body}</div>

        <div className={styles.agree_link}>
          <Link to={"/terms"}>利用規約</Link>
          <Link to={"/asct"}>特定商取引法に基づく表示</Link>
        </div>

        <button
          type="button"
          className={styles.agree_btn}
          onClick={handleAgree}
        >
          同意する
        </button>
      </div>
    </div>
  );
};
