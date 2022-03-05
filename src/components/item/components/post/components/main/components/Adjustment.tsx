import styles from "../Main.module.scss";

import CodeIcon from "@material-ui/icons/Code";

import { Matter } from "types/post";

interface PropType {
  post: Matter;
}

export const Adjustment: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <CodeIcon className={styles.main_icon} />
      <span className={styles.item_cnt_txt}>{post?.adjustment}</span>
    </div>
  );
};
