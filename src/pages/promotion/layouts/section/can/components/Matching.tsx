import React from 'react';
import styles from '../Can.module.scss';

export const Matching: React.FC = () => {
  return (
    <div className={styles.can_container}>
      <div className={styles.can_cnt}>
        <h2 className={styles.can_cnt_ttl}>AIでSES営業の効率をとにかく上げる</h2>

        <p className={styles.can_cnt_desc}>
          NLP（自然言語処理）で情報を自動入力し、
          <br />
          あなたのリソースを極限までカットします。
          <br />
          <br />
          業界初のエンジニア目線でのフォーマット化も実現。
          <br />
          <br />
          必要な営業項目が備わっており、データベースとしても使えるので、
          <br />
          だれでも再現度の高い営業活動ができます。
        </p>
      </div>

      <figure className={`${styles.can_visual}`}>
        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/ai.svg`}
          alt=''
          className={styles.can_visual_img}
        />
      </figure>
    </div>
  );
};
