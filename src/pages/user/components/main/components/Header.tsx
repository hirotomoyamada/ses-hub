import React from "react";
import styles from "../Main.module.scss";
import { Cover } from "components/cover/Cover";
import { Icon } from "components/icon/Icon";

import { Company, Person } from "types/post";
import { User } from "types/user";

interface PropType {
  user: User | Company | Person;
}

export const Header: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.main_header}>
      <Cover src={user?.cover} />

      <div className={styles.main_header_icon}>
        <Icon src={user?.icon} />
      </div>
    </div>
  );
};
