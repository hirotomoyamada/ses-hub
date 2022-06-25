import React from "react";
import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useResize } from "hooks/useResize";

import * as rootSlice from "features/root/rootSlice";

interface PropType {
  display?: boolean;
}

export const NotFound: React.FC<PropType> = ({ display }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notFound = useSelector(rootSlice.notFound);
  const [resize, inner] = useResize(notFound);

  const handleHome = () => {
    dispatch(rootSlice.handleNotFound(false));
    navigate("/");
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
