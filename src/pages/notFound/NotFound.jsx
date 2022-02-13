import styles from "./NotFound.module.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useResize } from "../../hooks/useResize";

import * as rootSlice from "../../features/root/rootSlice";

export const NotFound = ({ display }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const notFound = useSelector(rootSlice.notFound);
  const [resize, inner] = useResize(notFound);

  const handleHome = () => {
    dispatch(rootSlice.handleNotFound(false));
    history.push("/");
  };

  return notFound || display ? (
    <div className={`${styles.not} ${resize && styles.not_resize}`}>
      <div className={styles.not_inner} ref={inner}>
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
  ) : (
    <></>
  );
};
