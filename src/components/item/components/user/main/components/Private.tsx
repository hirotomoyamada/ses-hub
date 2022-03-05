import React from "react";
import styles from "../Main.module.scss";

import PersonIcon from "@material-ui/icons/Person";

interface PropType {
  post: Person;
}

import { Person } from "types/post";

export const Private: React.FC<PropType> = ({ post }) => {
  return (
    <div className={styles.main_wrap}>
      <PersonIcon className={styles.main_icon} />
      <span>
        {post?.profile?.sex}&nbsp; (&nbsp;{post?.profile?.age}歳&nbsp;)
      </span>
    </div>
  );
};
