import React from 'react';
import { useDispatch } from 'react-redux';
import root from '../Section.module.scss';
import styles from './Option.module.scss';

export const AI: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={`${styles.option_inner} ${styles.option_ai} ${root.article_inner}`}>
        <div className={styles.option_container}>
          <div className={styles.option_ttl}>
            <span className={styles.option_ttl_pop}>標準機能</span>
            <h1 className={`${styles.option_ttl_visual} ${root.article_ttl}`}>
              AIで営業情報を自動入力して営業工数を大幅削減！
            </h1>
          </div>

          <p className={styles.option_desc}>
            SESのいろんなフォーマットを
            <span>AI（NLP）で自動変換&入力できます。</span>
          </p>
        </div>

        <div className={styles.option_container}>
          <button
            type='button'
            className={`${styles.option_btn} ${styles.option_btn_ai}`}
            onClick={() => void 0}>
            デモを見る
          </button>
        </div>

        <img
          src={`${process.env.PUBLIC_URL}/img/promotion/ai.svg`}
          alt=''
          className={styles.option_ai_bg}
        />
      </div>
    </div>
  );
};
