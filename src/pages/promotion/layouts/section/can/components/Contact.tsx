import React from 'react';
import styles from '../Can.module.scss';

export const Contact: React.FC = () => {
  return (
    <div className={styles.can_container}>
      <div className={styles.can_cnt}>
        <h2 className={styles.can_cnt_ttl}>
          リコメンドAIで案件と人材が
          <br />
          ダイレクトにマッチング
        </h2>

        <p className={styles.can_cnt_desc}>
          情報起点でのマッチングを<span>さらにAIの自動リコメンド機能でサポート！</span>
          <br />
          検索しながらほしい情報を探す？もうほとんど不要です。
          <br />
          <br />
          案件・人材への問い合わせもカンタン。
          <br />
          問い合わせする情報と自身が提案したい情報を<span>選んでクリックするだけ。</span>
          <br />
          1提案/秒で提案できちゃうから、<span>他のことにも時間つかえちゃいます。</span>
        </p>
      </div>

      <figure className={`${styles.can_visual} ${styles.can_contact}`}>
        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/can_contact.svg`}
          alt=''
          className={styles.can_visual_img}
        />
      </figure>
    </div>
  );
};
