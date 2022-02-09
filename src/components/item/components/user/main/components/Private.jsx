import styles from "../Main.module.scss";

import PersonIcon from "@material-ui/icons/Person";

export const Private = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <PersonIcon className={styles.main_icon} />
      <span>
        {post?.profile?.sex}&nbsp; (&nbsp;{post?.profile?.age}歳&nbsp;)
      </span>
    </div>
  );
};
