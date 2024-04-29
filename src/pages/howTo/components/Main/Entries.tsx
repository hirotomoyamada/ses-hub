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
          に問い合わせることが可能です。
          <br />
          <br />
          投稿の詳細から、<span className={styles.howto_container_tag}>問い合わせをする</span>
          を選択すると、メンバーに問い合わせできるモーダルが表示されます。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag='️提案したい案件・人材' paid />

        <p>
          他のメンバーの
          <span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>
          に対し、
          <br />
          <br />
          <span className={styles.howto_container_acnt}>ご自身が登録した案件・人材の中から、</span>
          <br />
          <br />
          提案したい
          <span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>
          を選択し、問い合わせすることができます。
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
