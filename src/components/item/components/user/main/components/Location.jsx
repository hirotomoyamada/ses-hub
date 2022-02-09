import styles from "../Main.module.scss";

import LocationOnIcon from "@material-ui/icons/LocationOn";

export const Location = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <LocationOnIcon className={styles.main_icon} />
      <p>{post?.profile?.location}</p>
    </div>
  );
};
