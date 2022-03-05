import React from "react";
import styles from "../Can.module.scss";

export const Matching: React.FC = () => {
  return (
    <div className={styles.can_container}>
      <div className={styles.can_cnt}>
        <h2 className={styles.can_cnt_ttl}>コミュニケーションの新しいかたち</h2>

        <p className={styles.can_cnt_desc}>
          最大の特徴は
          <span>コミュニティーで培ってきたコミュニケーションデザイン。</span>
          <br />
          <br />
          1:1の商談機会をn:n:n:に。
          <br />
          その波及性がメンバー間の関係性と理解を広く深くしていきます。
          <br />
          <br />
          これからのSES営業はパートナーシップとタイミングが大切。
          <br />
          日常的なメンバー同士の雑談が
          <span>自然な商談の機会を生み出しています。</span>
        </p>
      </div>

      <figure className={`${styles.can_visual} ${styles.can_matching}`}>
        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/can_matching.svg`}
          alt=""
          className={styles.can_visual_img}
        />
      </figure>
    </div>
  );
};
