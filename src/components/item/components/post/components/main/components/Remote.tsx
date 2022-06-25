import styles from "../Main.module.scss";

import BusinessIcon from "@material-ui/icons/Business";

import { Matter, Resource } from "types/post";

interface PropType {
  post: Matter | Resource;
}

export const Remote: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <BusinessIcon className={styles.main_icon} />
      <span>
        {(post as Matter)?.remote === "あり"
          ? "リモート"
          : (post as Matter)?.remote === "なし"
          ? "常駐"
          : (post as Matter)?.remote}
      </span>
    </div>
  );
};

export const Belong: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <BusinessIcon className={styles.main_icon} />
      <span>{(post as Resource)?.belong}</span>
    </div>
  );
};
