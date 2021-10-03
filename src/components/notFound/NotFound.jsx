import styles from "./NotFound.module.scss";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as postSlice from "../../features/post/postSlice";
import * as userSlice from "../../features/user/userSlice";

export const NotFound = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleHome = () => {
    dispatch(postSlice.handleNotFound(false));
    dispatch(userSlice.handleNotFound(false));
    history.push("/");
  };

  return (
    <div className={styles.not}>
      <div className={styles.not_inner}>
        <img
          src={`${process.env.PUBLIC_URL}/img/app/404.svg`}
          alt=""
          className={styles.not_img}
        />
        <button type="button" onClick={handleHome} className={styles.not_btn}>
          ホーム
        </button>
      </div>
    </div>
  );
};
