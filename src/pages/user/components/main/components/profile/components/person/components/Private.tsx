import React from "react";
import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { Person } from "types/post";

interface PropType {
  user: Person;
}

export const Private: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.profile_wrap}>
      <div className={styles.profile_field}>
        <FontAwesomeIcon
          icon={faUser as IconProp}
          className={styles.profile_icon}
        />
        <p className={styles.profile_desc}>{user?.profile?.sex}</p>
        <p className={styles.profile_desc}>
          (&nbsp;{user?.profile?.age}歳&nbsp;)
        </p>
      </div>
      <div className={styles.profile_field}>
        <FontAwesomeIcon
          icon={faMapMarkerAlt as IconProp}
          className={styles.profile_icon}
        />
        <p className={styles.profile_desc}>{user?.profile?.location}</p>
      </div>
    </div>
  );
};
