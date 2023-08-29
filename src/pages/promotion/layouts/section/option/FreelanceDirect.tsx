import React from 'react';
import root from '../Section.module.scss';
import styles from './Option.module.scss';

export const FreelanceDirect: React.FC = () => {
  const tax = 1.1;

  return (
    <div>
      <div
        className={`${styles.option_inner} ${styles.option_freelanceDirect} ${root.article_inner}`}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/promotion/freelanceDirect.png)`,
        }}>
        <div className={styles.option_container}>
          <div className={styles.option_ttl}>
            <span className={styles.option_ttl_pop}>有料オプション</span>
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
            <span className={styles.option_type}>6ヶ月</span>

            <span className={styles.option_price}>
              {Math.round(300000 * tax).toLocaleString()}円
            </span>
          </div>

          <a
            href={`${process.env.REACT_APP_FREELANCE_DIRECT}/option`}
            className={styles.option_btn}
            target='_blank'
            rel='noreferrer noopener'>
            詳しく見る
          </a>
        </div>
      </div>
    </div>
  );
};
