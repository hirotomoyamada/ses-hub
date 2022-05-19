import React from "react";
import root from "../Section.module.scss";
import { Analytics } from "./Analytics";
import { FreelanceDirect } from "./FreelanceDirect";
import styles from "./Option.module.scss";

export const Option: React.FC = () => {
  return (
    <article className={`${styles.option} ${root.article}`}>
      <FreelanceDirect />
      <Analytics />
    </article>
  );
};
