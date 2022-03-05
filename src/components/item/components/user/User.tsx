import React from "react";
import root from "../../Item.module.scss";
import styles from "./User.module.scss";

import { Link } from "react-router-dom";

import { Handles } from "./handles/Handles";
import { Header } from "./header/Header";
import { Main } from "./main/Main";

import { Company, Person } from "types/post";

interface PropType {
  post: Company | Person;
  index?: "companys" | "persons";
  select?: string[];
}

export const User: React.FC<PropType> = ({ index, post, select }) => {
  return (
    <Link
      to={`/${index}/${post.uid}`}
      target="_blank"
      className={`${root.item_btn} ${
        (select || post?.status === "none") && root.item_btn_disable
      }`}
    >
      <article className={`${root.item} ${select && root.item_select}`}>
        <div className={styles.user}>
          <Header index={index} post={post} />
          <Handles post={post as Person} />
          <Main index={index} post={post} />
        </div>
      </article>
    </Link>
  );
};
