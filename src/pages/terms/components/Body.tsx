import React from "react";
import styles from "../Terms.module.scss";
import { body } from "../data/body";

export const Body: React.FC = () => {
  return <p className={styles.terms_body}>{body}</p>;
};
