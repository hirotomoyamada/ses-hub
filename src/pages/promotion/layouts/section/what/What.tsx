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
              星の数ほど存在するSES営業同士のダイレクトマッチング、セールスプロセス
              <span>のスマート化をおこなうことができます。</span>
              <br />
              <br />
              トークルーム内ではお互いに案件がない時期でも
              <span>デイリーにコミュニケーションを維持できます。</span>
              <br />
              そのため自然なシナジーとリピートが<span>生まれてきます。</span>
            </p>
          </div>

          <div className={styles.what_container_visual}>
            <img
              src={`${process.env.PUBLIC_URL}/img/promotion/what.svg`}
              alt=""
              className={styles.what_container_visual_img}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
