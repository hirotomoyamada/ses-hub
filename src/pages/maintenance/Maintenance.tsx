import React from "react";
import styles from "./Maintenance.module.scss";

import { useSelector } from "react-redux";
import { useResize } from "hooks/useResize";

import * as rootSlice from "features/root/rootSlice";

export const Maintenance: React.FC = () => {
  const maintenance = useSelector(rootSlice.data)?.maintenance?.status;
  const [resize, inner] = useResize(maintenance);

  // return (<></>)

  return maintenance === "enable" ? (
    <div
      className={`${styles.maintenance} ${resize && styles.maintenance_resize}`}
    >
      <div className={styles.maintenance_inner} ref={inner}>
        <span className={styles.maintenance_ttl}>メンテナンス中...</span>
        <img
          src={`${process.env.PUBLIC_URL}/img/app/maintenance.svg`}
          alt=""
          className={styles.maintenance_img}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};
