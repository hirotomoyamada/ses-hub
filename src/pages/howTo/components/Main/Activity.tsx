import React from "react";
import styles from "../../HowTo.module.scss";

import { Tag } from "../tag/Tag";

export const Activity: React.FC = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>アクティビティ</h1>

      <p className={styles.howto_desc}>
        閲覧やいいね数など解析に活用できるデータを取得できます
      </p>

      <div className={styles.howto_container}>
        <Tag tag="閲覧数" free paid />

        <p>
          あなたの投稿の
          <span className={styles.howto_container_tag}>閲覧された数</span>を
          表示しています。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;あなたの閲覧した数はカウントされません。
          </span>
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="いいね数" paid />

        <p>
          あなたの投稿の
          <span className={styles.howto_container_tag}>いいねされた数</span>を
          表示しています。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="出力数" paid />

        <p>
          あなたの投稿の
          <span className={styles.howto_container_tag}>出力された数</span>を
          表示しています。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="問い合わせ数" paid />

        <p>
          あなたの投稿の
          <span className={styles.howto_container_tag}>問い合わせされた数</span>
          を 表示しています。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="ログ" paid />

        <p>
          あなたの投稿に、あなたや他のユーザーが
          <span className={styles.howto_container_tag}>いいね</span>
          <span className={styles.howto_container_tag}>出力</span>
          <span className={styles.howto_container_tag}>問い合わせ</span>
          <br />
          したデータをタイムスタンプ形式で表示しています。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;最新から最大30件表示されています。
          </span>
        </p>
      </div>
    </div>
  );
};
