import React from 'react';
import root from '../Section.module.scss';
import styles from './What.module.scss';

export const What: React.FC = () => {
  return (
    <section className={`${styles.what} ${root.section}`}>
      <div className={root.section_inner}>
        <h1 className={`${styles.what_ttl} ${root.section_ttl}`}>
          What's <span>SES_HUB ?</span>
        </h1>
        <div className={styles.what_container}>
          <div className={styles.what_container_main}>
            <p className={styles.what_container_main_txt}>
              SES業務に特化した<span>SaaS型の営業支援ツールです</span>
              <br />
              <br />
              星の数ほど存在するSES営業同士のダイレクトマッチング、AI（NLP）でセールスプロセス
              <span>のスマート化をおこなうことができます。</span>
              <br />
              <br />
              データベース内ではお互いが保有する営業情報をリアルタイムで可視化できます。
              <br />
              そのため自然とロス軽減と効率の改善が可能になります。
            </p>
          </div>

          <div className={styles.what_container_visual}>
            <img
              src={`${process.env.PUBLIC_URL}/img/promotion/what.svg`}
              alt=''
              className={styles.what_container_visual_img}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
