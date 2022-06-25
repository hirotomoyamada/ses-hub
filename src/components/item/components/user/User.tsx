import React from "react";
import styles from "./User.module.scss";

import { Handles } from "./handles/Handles";
import { Header } from "./header/Header";
import { Main } from "./main/Main";

import { Company, Person } from "types/post";

interface PropType {
  post: Company | Person;
  index?: "companys" | "persons";
}

export const User: React.FC<PropType> = ({ index, post }) => {
  return (
    <article>
      <div className={styles.user}>
        <Header index={index} post={post} />
        <Handles post={post as Person} />
        <Main index={index} post={post} />
      </div>
    </article>
  );
};
