import styles from "./Information.module.scss";

import InfoIcon from "@material-ui/icons/Info";

import { useDispatch, useSelector } from "react-redux";
import * as rootSlice from "../../../../features/root/rootSlice";

export const Information = () => {
  const dispatch = useDispatch();
  const info = useSelector(rootSlice.data).information;

  const handleOpen = () => {
    dispatch(rootSlice.handleModal("info"));
  };

  return (
    <button type="button" onClick={handleOpen} className={styles.info}>
      <InfoIcon className={styles.info_icon} />
      <span className={styles.info_title}>{info?.title}</span>
    </button>
  );
};
