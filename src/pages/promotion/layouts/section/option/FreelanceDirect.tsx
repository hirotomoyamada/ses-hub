import React from "react";
import root from "../Section.module.scss";
import styles from "./Option.module.scss";

export const FreelanceDirect: React.FC = () => {
  // ver 2.X.X
  // const tax = 1.1;

  return (
    <div>
      <div
        className={`${styles.option_inner} ${styles.option_freelanceDirect} ${root.article_inner}`}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/promotion/freelanceDirect.png)`,
        }}
      >
        <div className={styles.option_container}>
          <div className={styles.option_ttl}>
            <span className={styles.option_ttl_pop}>オプション</span>
            <h1 className={`${styles.option_ttl_visual} ${root.article_ttl}`}>
              フリーランスダイレクトと連携！
            </h1>
          </div>

          <p className={styles.option_desc}>
            フリーランスを検索やアプローチ、
            <span>プロフィールやスキルシートの閲覧</span>
            <span>などの機能がご利用いただけます。</span>
          </p>
        </div>

        <div className={styles.option_container}>
          <div className={styles.option_wrap}>
            {/* ver 2.X.X */}
            {/* <span className={styles.option_type}>3ヶ月</span>

            <span className={styles.option_price}>
              {Math.round(45000 * tax).toLocaleString()}円
            </span> */}

            {/* 削除予定 */}
            <span className={styles.option_type}>今なら無料体験中</span>
          </div>

          <a
            href={`${process.env.REACT_APP_FREELANCE_DIRECT}/option`}
            className={styles.option_btn}
            target="_blank"
            rel="noreferrer noopener"
          >
            詳しく見る
          </a>
        </div>
      </div>

      {/* ver 2.X.X */}
      {/* <span className={styles.option_announce}>
        ※ オプションのみではSES_HUBをご利用いただけません。
      </span>
      <br />
      <span className={styles.option_announce}>
        ※ 有料プランと合わせてご利用ください。
      </span> */}

      {/* 削除予定 */}
      <span className={styles.option_announce}>
        ※ オプションを無料体験していただくには、プランの加入が必要です。
      </span>
    </div>
  );
};
