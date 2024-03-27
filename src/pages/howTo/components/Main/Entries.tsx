import React from 'react';
import styles from '../../HowTo.module.scss';

import { Tag } from '../tag/Tag';

export const Entries: React.FC = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>お問い合わせ</h1>

      <p className={styles.howto_desc}>他のメンバーの投稿にたいして、問い合わせをする</p>

      <div className={styles.howto_container}>
        <Tag tag='問い合わせする' paid />

        <p>
          他のメンバーが投稿した
          <span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>
          に問い合わせることが可能です。投稿の詳細から、
          <span className={styles.howto_container_tag}>問い合わせをする</span>
          を選択すると、メールや投稿したメンバーのSNSに直接問い合わせすることができます。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag='問い合わせしたリスト' paid />

        <p>
          一度問い合わせた投稿は、
          <span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>別に
          <span className={styles.howto_container_tag}>お問い合わせ</span>
          リストへ格納されます。過去に自分が問い合わせた投稿をチェックすることが可能です。
        </p>
      </div>
    </div>
  );
};
