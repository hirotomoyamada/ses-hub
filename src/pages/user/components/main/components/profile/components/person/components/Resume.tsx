import React from "react";
import styles from "../Person.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

import { Person } from "types/post";

interface PropType {
  user: Person;
}

export const Resume: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_col}>
        <span className={styles.profile_tag}>職務経歴書</span>

        <div
          className={`${styles.profile_file} ${
            !user?.resume && styles.profile_file_none
          }`}
        >
          <a
            href={user?.resume ? user?.resume : "/"}
            target="_blank"
            rel="noreferrer noopener"
          >
            <FontAwesomeIcon
              icon={faFilePdf as IconProp}
              className={`${styles.profile_file_icon} ${
                !user?.resume && styles.profile_file_icon_none
              }`}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
