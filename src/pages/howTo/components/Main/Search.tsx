import React from 'react';
import styles from '../../HowTo.module.scss';
import { Tag } from '../tag/Tag';

export const Search: React.FC = () => {
  return (
    <div className={styles.howto_main}>
      <h1 className={styles.howto_ttl}>検索</h1>

      <p className={styles.howto_desc}>
        他のメンバーの投稿を検索することができます
      </p>

      <div className={styles.howto_container}>
        <Tag tag="検索する" free paid />

        <p>
          強力な検索エンジンで、投稿のすべてを全文検索かけることができます。
          <span className={styles.howto_container_tag}>案件名</span>
          <span className={styles.howto_container_tag}>言語</span>
          <span className={styles.howto_container_tag}>ツール</span>
          など、あなたが検索したい投稿を探します。
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="投稿を見る" free paid />

        <p>
          メンバーが公開した
          <span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>
          の投稿を見ることができます。
          <br />
          <br />
          また、類似している投稿のリストを人工知能が作成し
          <span className={styles.howto_container_tag}>
            こんな案件・人材もオススメ
          </span>
          に表示します。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;リミテッド会員は、月&nbsp;5&nbsp;回まで閲覧可能です。
          </span>
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;リミテッド会員の閲覧回数は、毎月&nbsp;1&nbsp;日にリセットされます。
          </span>
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="タブを切り替える" free paid />

        <p>
          <span className={styles.howto_container_tag}>検索</span>では、
          <span className={styles.howto_container_tag}>案件</span>
          <span className={styles.howto_container_tag}>人材</span>
          <span className={styles.howto_container_tag}>フリーランス</span>
          <span className={styles.howto_container_tag}>メンバー</span>
          にタブを切り替えることができます。
          <br />
          <br />
          <span className={styles.howto_container_acnt}>
            ※&nbsp;フリーランスを選択するには、オプションを契約する必要があります。
          </span>
        </p>
      </div>

      <div className={styles.howto_container}>
        <Tag tag="フィルターをかける" free paid />

        <p>
          検索には必須のフィルター機能。新着順から更新順まで幅広いフィルターで検索をサポートします。
        </p>
      </div>
    </div>
  );
};
