import React from 'react';
import styles from '../Can.module.scss';

export const Search: React.FC = () => {
  return (
    <div className={styles.can_container}>
      <div className={styles.can_cnt}>
        <h2 className={styles.can_cnt_ttl}>
          SES営業から「ムダ」を
          <br />
          とにかく減らす
        </h2>

        <p className={styles.can_cnt_desc}>
          機能はすべて直感的なシンプルUI、<span>ユーザーにとって使いやすく。</span>
          <br />
          あなたはもってる営業情報を登録するだけ。
          <br />
          あとは多くの機能が自動発火、<span>営業プロセスをシームレスに。</span>
          <br />
          <br />
          登録された営業情報は適切に管理、データベースで可視化。
          <br />
          もうダイレクトセールスの前に<span>問い合わせ先との相性までわかっちゃうから、</span>
          <br />
          ムダな「探す」「待つ」「作業」「連携」「質問」<span>とかなくせちゃいますね。</span>
        </p>
      </div>

      <figure className={`${styles.can_visual} ${styles.can_search}`}>
        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/can_search.svg`}
          alt=''
          className={styles.can_visual_img}
        />
      </figure>
    </div>
  );
};
