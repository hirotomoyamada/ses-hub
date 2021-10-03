import styles from "../Main.module.scss";

import LocationOnIcon from "@material-ui/icons/LocationOn";

export const Location = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <LocationOnIcon className={styles.main_icon} />
      <p>{post?.location?.area}</p>
    </div>
  );
};

export const Station = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <LocationOnIcon className={styles.main_icon} />
      <p>{post?.station}</p>
    </div>
  );
};
