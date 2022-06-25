import styles from "../Main.module.scss";

import LocationOnIcon from "@material-ui/icons/LocationOn";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Location: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <LocationOnIcon className={styles.main_icon} />
      <p>{(post as Matter)?.location?.area}</p>
    </div>
  );
};

export const Station: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <LocationOnIcon className={styles.main_icon} />
      <p>{(post as Resource)?.station}</p>
    </div>
  );
};
