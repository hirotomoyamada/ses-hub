import React from "react";
import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import { Person } from "types/post";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface PropType {
  user: Person;
}

export const Email: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.profile_field}>
      <FontAwesomeIcon
        icon={faEnvelope as IconProp}
        className={styles.profile_icon}
      />
      <a
        href={`mailto:${user?.profile?.email}`}
        className={`${styles.profile_link} ${
          user?.request !== "enable" && styles.profile_link_dummy
        }`}
      >
        {user?.profile?.email}
      </a>
    </div>
  );
};
