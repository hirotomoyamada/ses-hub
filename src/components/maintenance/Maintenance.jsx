import styles from "./Maintenance.module.scss";

import { useSelector } from "react-redux";

import * as userSlice from "../../features/user/userSlice";

export const Maintenance = () => {
  const maintenance = useSelector(userSlice.data).maintenance?.status;

  return (
    maintenance === "enable" && (
      <div className={styles.maintenance}>
        <div className={styles.maintenance_inner}>
          <span className={styles.maintenance_ttl}>メンテナンス中...</span>
          <img
            src={`${process.env.PUBLIC_URL}/img/app/maintenance.svg`}
            alt=""
            className={styles.maintenance_img}
          />
        </div>
      </div>
    )
  );
};
