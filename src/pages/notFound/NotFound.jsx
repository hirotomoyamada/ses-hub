import styles from "./NotFound.module.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useScrollController } from "../../hook/useScrollController";

import * as rootSlice from "../../features/root/rootSlice";

export const NotFound = () => {
  useScrollController();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const notFound = useSelector(rootSlice.notFound);

  const handleHome = () => {
    dispatch(rootSlice.handleNotFound(false));
    history.push("/");
  };

  return (
    notFound && (
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
    )
  );
};
