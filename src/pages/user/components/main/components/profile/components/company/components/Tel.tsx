import React from "react";
import styles from "../Company.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

import { Company } from "types/post";

interface PropType {
  user: Company;
  demo: boolean;
}

export const Tel: React.FC<PropType> = ({ user, demo }) => {
  return user?.profile?.tel ? (
    <div className={styles.profile_field}>
      <FontAwesomeIcon
        icon={faPhoneAlt as IconProp}
        className={styles.profile_icon}
      />
      <a href={`tel:${user?.profile?.tel}`} className={styles.profile_link}>
        {!demo ? user?.profile?.tel : "0X0-XXXX-XXXX"}
      </a>
    </div>
  ) : (
    <></>
  );
};
