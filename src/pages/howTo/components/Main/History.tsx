import React from 'react';
import styles from '../../HowTo.module.scss';

import { Tag } from '../tag/Tag';

export const History: React.FC = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>履歴</h1>

      <p className={styles.howto_desc}>投稿の閲覧履歴を見る</p>

      <div className={styles.howto_container}>
        <Tag tag='履歴のリスト' free paid />

        <p>
          一度閲覧した投稿は、
          <span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>別に
          <span className={styles.howto_container_tag}>履歴</span>
          リストへ格納されます。過去に閲覧した投稿をチェックすることが可能です。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;自分の投稿を閲覧しても履歴には表示されません。
          </span>
        </p>
      </div>
    </div>
  );
};
