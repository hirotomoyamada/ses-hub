import React from "react";
import styles from "../../HowTo.module.scss";
import { Tag } from "../tag/Tag";

export const Requests: React.FC = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>リクエスト</h1>

      <p className={styles.howto_desc}>
        検索でヒットしたフリーランスへリクエストをする
      </p>

      <div className={styles.howto_container}>
        <Tag tag="プロフィール" paid option />

        <p>
          フリーランスのプロフィールの一部(氏名やメールアドレスなど)は、あなたが
          <span className={styles.howto_container_tag}>リクエスト</span>
          をしない限り、開示されることはありません。
          <br />
          <br />
          あなたの<span className={styles.howto_container_tag}>リクエスト</span>
          が承認されると、プロフィールのすべてを見ることができます。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="リクエストをする" paid option />
        
        <p>
          気になったフリーランスへ
          <span className={styles.howto_container_tag}>リクエスト</span>
          を送ると、そのフリーランスへ通知が届きます。
          <br />
          <br />
          <span className={styles.howto_container_tag}>リクエスト</span>
          が承認されると、一部しか表示されていなかったフリーランスのプロフィールがすべて表示されるようになります。
          <br />
          <br />
          また、<span className={styles.howto_container_tag}>リクエスト</span>
          にはメッセージを添えることも可能です。メッセージを活用して、積極的にフリーランスへアピールしましょう。
        </p>
      </div>
    </div>
  );
};
