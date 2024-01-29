import React from 'react';
import styles from '../../HowTo.module.scss';
import { Tag } from '../tag/Tag';

export const Matching: React.FC = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>マッチング</h1>

      <p className={styles.howto_desc}>投稿された案件・人材にマッチングする</p>

      <div className={styles.howto_container}>
        <Tag tag='オススメの案件・人材' free paid />

        <p>
          投稿された案件・人材の情報を元にして、
          <span className={styles.howto_container_tag}>オススメの案件・人材</span>を表示します。
          <br />
          <br />
          <span className={styles.howto_container_tag}>オススメの案件・人材</span>
          は、案件・人材の詳細ページでご確認ください。
        </p>
      </div>
    </div>
  );
};
