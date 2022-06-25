import React from "react";
import styles from "../Company.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

import * as functions from "functions";

import { Company } from "types/post";

interface PropType {
  user: Company;
}

export const CreateAt: React.FC<PropType> = ({ user }) => {
  return (
    <div className={styles.profile_createAt}>
      <FontAwesomeIcon
        icon={faCalendarAlt as IconProp}
        className={styles.profile_icon}
      />
      <span>
        {functions.root.timestamp(user?.createAt, "month")}
        からSES_HUBを利用しています
      </span>
    </div>
  );
};
