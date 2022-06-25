import React from "react";
import styles from "../Company.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import { Company } from "types/post";

interface PropType {
  user: Company;
  demo: boolean;
}

export const Address: React.FC<PropType> = ({ user, demo }) => {
  return user?.profile?.postal && user?.profile?.address ? (
    <div className={styles.profile_field}>
      <FontAwesomeIcon
        icon={faMapMarkerAlt as IconProp}
        className={styles.profile_icon}
      />

      <p className={styles.profile_address}>
        <span className={styles.profile_postal}>
          {!demo ? user?.profile?.postal : "XXX-XXXX"}
        </span>
        {!demo ? user?.profile?.address : "デモ県デモ市デモ区デモ X-XX-XX"}
      </p>
    </div>
  ) : (
    <></>
  );
};
