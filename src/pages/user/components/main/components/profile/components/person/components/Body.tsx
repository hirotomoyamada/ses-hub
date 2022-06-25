import React from "react";
import styles from "../Person.module.scss";

import { Person } from "types/post";

interface PropType {
  user: Person;
}

export const Body: React.FC<PropType> = ({ user }) => {
  return user?.profile?.body ? (
    <p className={styles.profile_body}>{user?.profile?.body}</p>
  ) : (
    <></>
  );
};
