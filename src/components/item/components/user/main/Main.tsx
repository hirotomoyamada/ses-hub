import React from "react";
import styles from "./Main.module.scss";

import { Costs } from "./components/Costs";
import { Period } from "./components/Period";
import { Location } from "./components/Location";
import { Private } from "./components/Private";
import { Body } from "./components/Body";

import { Company, Person } from "types/post";

interface PropType {
  post: Company | Person;
  index?: "companys" | "persons";
}

export const Main: React.FC<PropType> = ({ index, post }) => {
  return index !== "persons" ? (
    <div className={styles.main_companys}>
      <p className={styles.main_companys_body}>
        {post?.profile?.body
          ? post?.profile?.body
          : "さぁ、あなたのプロフィールを充実させていきましょう。SNSアカウントを登録して他のメンバーと情報連携していきましょう!"}
      </p>
    </div>
  ) : (
    <div className={styles.main}>
      <div className={styles.main_side}>
        <Location post={post as Person} />
        <Private post={post as Person} />
        <Period post={post as Person} />
        <Costs post={post as Person} />
      </div>

      <Body post={post as Person} />
    </div>
  );
};
