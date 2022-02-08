import styles from "./NotFound.module.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useResize } from "../../hook/useResize";

import * as rootSlice from "../../features/root/rootSlice";

export const NotFound = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [resize, inner] = useResize();

  const notFound = useSelector(rootSlice.notFound);

  const handleHome = () => {
    dispatch(rootSlice.handleNotFound(false));
    history.push("/");
  };

  return (
    notFound && (
      <div className={`${styles.not} ${resize && styles.not_resize}`}>
        <div
          className={styles.not_inner}
          ref={inner}
        >
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
