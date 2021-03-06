import React from "react";
import styles from "../../HowTo.module.scss";

import { Tag } from "../tag/Tag";

export const Likes: React.FC = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>いいね</h1>

      <p className={styles.howto_desc}>
        自分や他のメンバーの投稿へいいねをする
      </p>

      <div className={styles.howto_container}>
        <Tag tag="いいねする" free paid />

        <p>
          あなたや別のメンバーの投稿を
          <span className={styles.howto_container_tag}>いいね</span>
          リストに格納しておくことができます。再度投稿を見たいときなど、幅広い用途でお使いいただけます。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="いいねを解除する" free paid />
        
        <p>
          <span className={styles.howto_container_tag}>いいね</span>
          している投稿は、再度アイコンをタップすることで自動的に解除されます。
        </p>
      </div>
    </div>
  );
};
